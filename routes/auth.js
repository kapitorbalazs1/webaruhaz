const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const router = express.Router();

module.exports = (Felhasznalo) => {
    router.post('/regisztracio', async (req, res) => {
        try {
            const { felhasznalonev, jelszo, szuletesi_datum, email_cim, telefonszam, lakcim, nem, vezeteknev, keresztnev, biztonsagi_kerdes, biztonsagi_valasz } = req.body;

            // Kötelező mezők ellenőrzése
            if (!felhasznalonev || !jelszo || !email_cim || !biztonsagi_kerdes || !biztonsagi_valasz) {
                console.error('Missing fields:', req.body);
                return res.status(400).json({ hiba: 'Hiányosan kitöltött mezők!' });
            }

            // E-mail cím ellenőrzése
            const emailMinta = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailMinta.test(email_cim)) {
                console.error('Invalid email format:', email_cim);
                return res.status(400).json({ hiba: 'Az email cím formátuma nem megfelelő!' });
            }

            // Létező felhasználó ellenőrzése
            const letezoFelhasznalo = await Felhasznalo.findOne({
                where: {
                    [Op.or]: [
                        { felhasznalonev },
                        { email_cim }
                    ]
                }
            });

            if (letezoFelhasznalo) {
                console.error('User already exists:', letezoFelhasznalo);
                return res.status(409).json({ hiba: 'A felhasználónév vagy az email cím már használatban van.' });
            }

            // Jelszó titkosítása
            const titkositottJelszo = await bcrypt.hash(jelszo, 10);

            // Új felhasználó létrehozása
            const ujFelhasznalo = await Felhasznalo.create({
                felhasznalonev,
                jelszo: titkositottJelszo,
                szuletesi_datum,
                email_cim,
                telefonszam,
                lakcim,
                nem,
                vezeteknev,
                keresztnev,
                biztonsagi_kerdes,
                biztonsagi_valasz
            });

            console.log('New user created:', ujFelhasznalo);
            res.status(201).json({ uzenet: 'Sikeres regisztráció!', felhasznaloAzonosito: ujFelhasznalo.id });
        } catch (hiba) {
            console.error('Error during registration:', hiba);
            res.status(500).json({ hiba: 'Váratlan hiba történt a regisztráció során.' });
        }
    });

    router.post('/bejelentkezes', async (req, res) => {
        const { azonosito, jelszo } = req.body;
    
        if (!azonosito || !jelszo) {
            return res.status(400).json({ hiba: 'Felhasználónév vagy email és jelszó megadása kötelező!' });
        }
    
        try {
            const felhasznalo = await Felhasznalo.findOne({
                where: {
                    [Op.or]: [
                        { felhasznalonev: azonosito },
                        { email_cim: azonosito }
                    ]
                }
            });
    
            if (!felhasznalo) {
                return res.status(404).json({ hiba: 'Felhasználónév nem található!' });
            }
    
            const jelszoHelyes = await bcrypt.compare(jelszo, felhasznalo.jelszo);
            if (!jelszoHelyes) {
                return res.status(401).json({ hiba: 'Helytelen jelszó!' });
            }
    
            res.status(200).json({ uzenet: 'Sikeres bejelentkezés!', felhasznalo: { felhasznalonev: felhasznalo.felhasznalonev } });
        } catch (hiba) {
            console.error('Error during login:', hiba);
            res.status(500).json({ hiba: 'Váratlan hiba történt a bejelentkezés során.' });
        }
    });    

    return router;
};