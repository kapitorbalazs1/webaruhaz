const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

// Forgot Password
module.exports = (User ) => {
    router.post('/forgot-password', async (req, res) => {
        const { email, biztonsagi_kerdes, biztonsagi_valasz } = req.body;

        if (!email || !biztonsagi_kerdes || !biztonsagi_valasz) {
            return res.status(400).json({ message: 'Kérjük, töltse ki az összes mezőt.' });
        }

        try {
            const user = await User.findOne({ where: { email_cim: email } });

            if (!user) {
                return res.status(404).json({ message: 'Felhasználó nem található.' });
            }

            if (user.biztonsagi_kerdes !== biztonsagi_kerdes || user.biztonsagi_valasz !== biztonsagi_valasz) {
                return res.status(401).json({ message: 'Hibás biztonsági kérdés vagy válasz.' });
            }

            res.status(200).json({ message: 'Ellenőrizze az email fiókját a jelszó visszaállításához!' });
        } catch (error) {
            console.error('Hiba a jelszó visszaállítása során:', error.message);
            res.status(500).json({ message: 'Váratlan hiba történt a jelszó visszaállítása során.' });
        }
    });

    // Change Password
    router.post('/change-password', async (req, res) => {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ message: 'Kérjük, töltse ki az összes mezőt.' });
        }

        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await User.update({ jelszo: hashedPassword }, { where: { email_cim: email } });

            res.status(200).json({ message: 'A jelszó sikeresen módosítva!' });
        } catch (error) {
            console.error('Hiba a jelszó módosítása során:', error.message);
            res.status(500).json({ message: 'Váratlan hiba történt a jelszó módosítása során.' });
        }
    });

    return router;
};