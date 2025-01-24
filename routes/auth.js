const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); // Az Op importálása

const router = express.Router();

// User Registration
module.exports = (User ) => {
    router.post('/register', async (req, res) => {
        const { username, password, birthDate, email, phone, address, gender, lastName, firstName, biztonsagi_kerdes, biztonsagi_valasz } = req.body;

        if (!username || !password || !email || !biztonsagi_kerdes || !biztonsagi_valasz) {
            return res.status(400).json({ error: 'Hiányosan kitöltött mezők!' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Az email cím formátuma nem megfelelő!' });
        }

        try {
            const existingUser  = await User.findOne({
                where: {
                    [Op.or]: [
                        { felhasznalonev: username },
                        { email_cim: email }
                    ]
                }
            });

            if (existingUser ) {
                return res.status(409).json({ error: 'A felhasználónév vagy az email cím már használatban van.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser  = await User.create({
                felhasznalonev: username,
                jelszo: hashedPassword,
                szuletesi_datum: birthDate,
                email_cim: email,
                telefonszam: phone,
                lakcim: address,
                nem: gender,
                vezeteknev: lastName,
                keresztnev: firstName,
                biztonsagi_kerdes: biztonsagi_kerdes,
                biztonsagi_valasz: biztonsagi_valasz
            });

            res.status(201).json({ message: 'Felhasználó sikeresen regisztrálva!', userId: newUser .id });
        } catch (error) {
            console.error('Hiba a regisztráció során:', error.message);
            res.status(500).json({ error: 'Váratlan hiba történt a regisztráció során.' });
        }
    });

    // User Login
    router.post('/login', async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'A felhasználónév és a jelszó megadása kötelező!' });
        }

        try {
            const user = await User.findOne({ where: { felhasznalonev: username } });

            if (!user) {
                return res.status(401).json({ error: 'Hibás felhasználónév vagy jelszó!' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.jelszo);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Hibás felhasználónév vagy jelszó!' });
            }

            res.status(200).json({ message: 'Bejelentkezés sikeres!', user: { id: user.id, username: user.felhasznalonev, email: user.email_cim } });
        } catch (error) {
            console.error('Hiba a bejelentkezés során:', error.message);
            res.status(500).json({ error: 'Váratlan hiba történt a bejelentkezés során.' });
        }
    });

    return router;
};