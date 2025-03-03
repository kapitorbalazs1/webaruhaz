const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const moment = require('moment-timezone');

require('dotenv').config();

const router = express.Router();

// Singleton Puppeteer böngésző példány újrafelhasználáshoz
let bongeszoPeldany = null;

const adatbazis = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: 'Europe/Budapest'
  }
);

const RendelesAdatok = adatbazis.define('RendelesAdatok', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  felhasznalonev: { type: DataTypes.STRING, allowNull: false },
  nev: { type: DataTypes.STRING, allowNull: false },
  rendeles_datum: { type: DataTypes.DATE, allowNull: false },
  osszeg: { type: DataTypes.INTEGER, allowNull: false },
  szallitasi_cim: { type: DataTypes.STRING, allowNull: true },
  pdf_fajl: { type: DataTypes.STRING, allowNull: true }
}, { tableName: 'rendeles_adatok', timestamps: false });

const nyilvanosKonyvtar = path.join(__dirname, '../../webaruhaz_frontend/rendelesek');
if (!fs.existsSync(nyilvanosKonyvtar)) {
  fs.mkdirSync(nyilvanosKonyvtar, { recursive: true });
  console.log(`Könyvtár létrehozva: ${nyilvanosKonyvtar}`);
}

router.use('/pdf', express.static(nyilvanosKonyvtar));
router.use(express.json());
router.use(cors());

async function lekerBongeszoPeldanyt() {
  if (!bongeszoPeldany) {
    bongeszoPeldany = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      timeout: 30000
    });
  }
  return bongeszoPeldany;
}

router.post('/pdf-generalas', async (req, res) => {
  const { elemek, felhasznalonev, vasarloAdatok, kuponKod, fizetesiMod } = req.body;

  if (!elemek?.length) {
    return res.status(400).json({ hiba: 'Nincsenek termékek a rendelésben.' });
  }

  if (!felhasznalonev) {
    return res.status(400).json({ hiba: 'Felhasználónév hiányzik.' });
  }

  // Összeg kiszámítása
  const osszeg = elemek.reduce((osszeg, elem) => osszeg + (elem.ar * elem.mennyiseg || 0), 0);
  const nettoOsszeg = osszeg;
  const afa = Math.round(nettoOsszeg * 0.27);
  const bruttoOsszeg = nettoOsszeg + afa;
  const szallitasiDij = bruttoOsszeg >= 20000 ? 0 : 1500;
  const utanvetDij = fizetesiMod === 'utánvét' ? 1000 : 0;
  const vegosszegKuponNelkul = bruttoOsszeg + szallitasiDij + utanvetDij;
  const eredetiAr = vegosszegKuponNelkul;
  const kedvezmeny = kuponKod?.kedvezmeny || 0;
  const kedvezmenyOsszeg = Math.round(eredetiAr * (kedvezmeny / 100));
  const vegosszeg = eredetiAr - kedvezmenyOsszeg;
  const formazottDatum = moment().tz('Europe/Budapest').format('YYYY.MM.DD HH:mm:ss');

  const htmlTartalom = `
    <!DOCTYPE html>
    <html lang="hu">
    <head>
      <meta charset="UTF-8">
      <title>Rendelés Részletei</title>
      <style>
        .header { background-color: #000080; color: #ffffff; display: flex; justify-content: space-between; padding: 10px; align-items: center; }
        .header span:first-child { text-align: left; padding-right: 150px; }
        .header span:nth-child(2) { padding-right: 30px; }
        .header span:nth-child(3) { padding-right: 25px; }
        .header span:nth-child(4) { padding-right: 5px; }
        .header span:last-child { text-align: right; padding-left: 80px; }
        body { font-family: 'DejaVu Sans', sans-serif; }
        h1 { text-align: center; color: #000080; }
        .line { border-bottom: 1px solid #000080; margin: 20px 0; }
        .header, .item, .total { display: flex; justify-content: space-between; padding: 10px; align-items: center; }
        div.header, div.item { margin: 0px 20px 0px 20px; }
        .item:nth-child(even) { background-color: #f0f0f0; }
        .item:nth-child(odd) { background-color: #ffffff; }
        .footer { text-align: center; color: #000080; margin-top: 20px; }
        .date { text-align: center; color: #000080; margin: 10px; }
        .item span { flex: 1; }
        .item span:first-child { flex: 1 0 160px; }
        .item span:last-child { text-align: right; }
        .total { display: flex; justify-content: space-between; padding: 10px; align-items: center; }
        .total span:first-child { text-align: left; }
        .total span:last-child { text-align: right; }
        .vasarlo-adatok { margin-bottom: 20px; padding: 0px 20px 0px 20px; }
        .vasarlo-adatok div { display: flex; justify-content: space-between; margin: 5px 0; }
        .vasarlo-adatok div span:first-child { text-align: left; }
        .vasarlo-adatok div span:last-child { text-align: right; }
        .section-title { font-size: 2em; text-align: center; color: #000080; font-weight: bold; margin: 20px 0; }
        .osszegzes { margin-top: 20px; padding: 0px 20px 0px 20px; }
        .osszegzes div { display: flex; justify-content: space-between; padding: 5px 0; }
      </style>
    </head>
    <body>
      <h1>Rendelés Részletei</h1>
      <div class="line"></div>
      <div class="date">${formazottDatum}</div>
      <div class="section-title">Vásárló adatai</div>
      <div class="vasarlo-adatok">
        <div><span>Név:</span><span>${vasarloAdatok.nev}</span></div>
        <div><span>Szállítási Cím:</span><span>${vasarloAdatok.szallitasiCim}</span></div>
        <div><span>Lakcím:</span><span>${vasarloAdatok.lakcim}</span></div>
        <div><span>Telefon:</span><span>${vasarloAdatok.telefon}</span></div>
        <div><span>E-mail:</span><span>${vasarloAdatok.email}</span></div>
      </div>
      <div class="line"></div>
      <div class="section-title">Rendelés adatai</div>
      <div class="header">
        <span>Termék</span><span>Méret</span><span>Szín</span><span>Nem</span><span>Mennyiség</span><span>Ár</span>
      </div>
      ${elemek.map(elem => `
        <div class="item">
          <span>${elem.marka} - ${elem.leiras}</span>
          <span>${elem.meret}</span>
          <span>${elem.szin}</span>
          <span>${elem.nem}</span>
          <span>${elem.mennyiseg} db</span>
          <span>${(elem.ar * elem.mennyiseg).toFixed(0)} HUF</span>
        </div>
      `).join('')}
      <div class="line"></div>
      <div class="osszegzes">
        <div><span>Nettó Összeg:</span><span>${nettoOsszeg.toFixed(0)} HUF</span></div>
        <div><span>ÁFA (27%):</span><span>${afa.toFixed(0)} HUF</span></div>
        ${fizetesiMod === 'utánvét' ? `<div><span>Utánvétel díj:</span><span>1000 HUF</span></div>` : ''}
        <div><span>Szállítási Díj:</span><span>${szallitasiDij} HUF</span></div>
        ${kedvezmeny > 0 ? `
          <div><span style="text-decoration: line-through;">Eredeti ár:</span><span style="text-decoration: line-through;">${eredetiAr.toFixed(0)} HUF</span></div>
          <div class="total"><strong><span>Kedvezményes ár:</span></strong><strong><span>${vegosszeg.toFixed(0)} HUF</span></strong></div>
          <div><span>Kedvezmény:</span><span>${kedvezmeny} %</span></div>
        ` : `
          <div><span>Összesen:</span><span>${(bruttoOsszeg + szallitasiDij + utanvetDij).toFixed(0)} HUF</span></div>
        `}
      </div>
      <div class="footer">
        <p>Köszönjük a vásárlást! További információkért keresse ügyfélszolgálatunkat.</p>
        <p>© DivatPalota</p>
      </div>
    </body>
    </html>
  `;

  try {
    const bongeszo = await lekerBongeszoPeldanyt();
    const oldal = await bongeszo.newPage();

    await oldal.setContent(htmlTartalom, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    const fajlNev = `rendeles_${Date.now()}.pdf`;
    const fajlUtvonal = path.join(nyilvanosKonyvtar, fajlNev);
    const pdfBuffer = await oldal.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
    });

    await oldal.close();

    await new Promise((resolve, reject) => {
      fs.writeFile(fajlUtvonal, pdfBuffer, async (err) => {
        if (err) {
          console.error('Hiba a fájl írása közben:', err);
          return reject(err);
        }
        console.log(`PDF mentve: ${fajlUtvonal}`);

        await RendelesAdatok.create({
          felhasznalonev,
          nev: vasarloAdatok.nev,
          rendeles_datum: new Date(),
          osszeg: vegosszeg,
          szallitasi_cim: vasarloAdatok.szallitasiCim,
          pdf_fajl: fajlNev,
        });
        console.log('Rendelés mentve az adatbázisba.');
        resolve();
      });
    });

    res.status(200).json({ message: 'PDF kész!', fajlUtvonal: `/${fajlNev}` });
  } catch (error) {
    console.error('Hiba:', error);
    res.status(500).json({ hiba: 'Hiba a PDF generálása közben.' });
  }
});

process.on('SIGINT', async () => {
  if (bongeszoPeldany) {
    await bongeszoPeldany.close();
    console.log('Böngésző példány bezárva.');
  }
  process.exit(0);
});

router.post('/pdf-megnyitas', async (req, res) => {
  const { fajlUtvonal } = req.body;

  if (!fajlUtvonal) {
    return res.status(400).json({ hiba: 'Fájl elérési út hiányzik.' });
  }

  const teljesUtvonal = path.join(nyilvanosKonyvtar, fajlUtvonal);
  if (!fs.existsSync(teljesUtvonal)) {
    return res.status(404).json({ hiba: 'A PDF nem található.' });
  }

  exec(`start "" "${teljesUtvonal}"`, (err) => {
    if (err) {
      console.error('Hiba:', err);
      return res.status(500).json({ hiba: 'Nem sikerült megnyitni a PDF-et.' });
    }
    res.status(200).json({ message: 'PDF megnyitva!' });
  });
});

router.get('/rendelesek', async (req, res) => {
  try {
    if (!fs.existsSync(nyilvanosKonyvtar)) {
      fs.mkdirSync(nyilvanosKonyvtar, { recursive: true });
      console.log(`Könyvtár létrehozva: ${nyilvanosKonyvtar}`);
    }
    
    const rendelesek = await RendelesAdatok.findAll();
    res.status(200).json(rendelesek.map(rendeles => ({

      id: rendeles.id,
      datum: rendeles.rendeles_datum,
      vasarloNev: rendeles.nev,
      felhasznalonev: rendeles.felhasznalonev,
      osszeg: rendeles.osszeg,
      szallitasiCim: rendeles.szallitasi_cim,
      pdfUrl: rendeles.pdf_fajl ? `/${rendeles.pdf_fajl}` : null,
    })));
  } catch (error) {
    console.error('Hiba:', error);
    res.status(500).json({ hiba: 'Hiba a rendelések lekérése közben.' });
  }
});

module.exports = router;
