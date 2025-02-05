const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const router = express.Router();

module.exports = (Felhasznalo) => {
    router.post('/regisztracio', async (req, res) => {
        try {
            const { felhasznalonev, jelszo, szuletesi_datum, email_cim, telefonszam, lakcim, nem, vezeteknev, keresztnev, biztonsagi_kerdes, biztonsagi_valasz } = req.body;

            // Validate required fields
            if (!felhasznalonev || !jelszo || !email_cim || !biztonsagi_kerdes || !biztonsagi_valasz) {
                console.error('Missing fields:', req.body);
                return res.status(400).json({ hiba: 'Hiányosan kitöltött mezők!' });
            }

            // Validate email format
            const emailMinta = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailMinta.test(email_cim)) {
                console.error('Invalid email format:', email_cim);
                return res.status(400).json({ hiba: 'Az email cím formátuma nem megfelelő!' });
            }

            // Check if username or email already exists
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

            // Hash the password
            const titkositottJelszo = await bcrypt.hash(jelszo, 10);

            // Create new user
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

        // Validate required fields
        if (!azonosito || !jelszo) {
            return res.status(400).json({ hiba: 'Felhasználónév vagy email és jelszó megadása kötelező!' });
        }

        try {
            // Find user by username or email
            const felhasznalo = await Felhasznalo.findOne({
                where: {
                    [Op.or]: [
                        { felhasznalonev: azonosito },
                        { email_cim: azonosito }
                    ]
                }
            });

            // Check if user exists
            if (!felhasznalo) {
                return res.status(404).json({ hiba: 'Felhasználónév nem található!' });
            }

            // Compare passwords
            const jelszoHelyes = await bcrypt.compare(jelszo, felhasznalo.jelszo);
            if (!jelszoHelyes) {
                return res.status(401).json({ hiba: 'Helytelen jelszó!' });
            }

            // Successful login
            res.status(200).json({ uzenet: 'Sikeres bejelentkezés!', felhasznalo: felhasznalo });
        } catch (hiba) {
            console.error('Error during login:', hiba);
            res.status(500).json({ hiba: 'Váratlan hiba történt a bejelentkezés során.' });
        }
    });

    return router;
};