require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const Felhasznalo = require('./models/user');
const rendelesUtvonalak = require('./routes/order');

const router = express();

router.use(cors());
router.use(express.json());

const adatbazis = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

adatbazis.authenticate()
  .then(() => {
    console.log('✅ Sikeresen csatlakoztunk az adatbázishoz!');
    return adatbazis.sync();
  })
  .then(() => {
    console.log('📦 Adatbázis sikeresen szinkronizálva!');
  })
  .catch(hiba => {
    console.error('❌ Hiba történt az adatbázis kapcsolat vagy szinkronizálás során:', hiba);
    process.exit(1);
  });

const authUtvonalak = require('./routes/auth')(Felhasznalo, adatbazis);
const jelszoUtvonalak = require('./routes/password')(Felhasznalo, adatbazis);

router.use('/api', authUtvonalak);
router.use('/api', jelszoUtvonalak);
router.use('/api', rendelesUtvonalak);

router.get('/api/ruhak', async (keres, valasz) => {
  try {
    const [polok, puloverek, ingek, kabatok, nadragok] = await Promise.all([
      adatbazis.query('SELECT * FROM polok', { type: Sequelize.QueryTypes.SELECT }),
      adatbazis.query('SELECT * FROM puloverek', { type: Sequelize.QueryTypes.SELECT }),
      adatbazis.query('SELECT * FROM ingek', { type: Sequelize.QueryTypes.SELECT }),
      adatbazis.query('SELECT * FROM kabatok', { type: Sequelize.QueryTypes.SELECT }),
      adatbazis.query('SELECT * FROM nadragok', { type: Sequelize.QueryTypes.SELECT })
    ]);

    const ruhakLista = {
      Polok: polok,
      Puloverek: puloverek,
      Ingek: ingek,
      Kabatok: kabatok,
      Nadragok: nadragok
    };

    valasz.status(200).json(ruhakLista);
  } catch (hiba) {
    console.error('⚠️ Hiba történt a ruhák lekérése közben:', hiba.message);
    valasz.status(500).json({ hiba: 'Nem sikerült lekérdezni a ruhák listáját. Próbáld újra később!' });
  }
});

const port = process.env.PORT || 3000;
router.listen(port, () => {
  console.log(`🚀 A szerver elindult a ${port}-es porton!`);
  console.log(`🔗 Nyisd meg az alábbi URL címen: http://localhost:${port}`);
});