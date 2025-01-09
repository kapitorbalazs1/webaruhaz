const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('webaruhaz', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Sikeres adatbázis kapcsolat!');
    })
    .catch(err => {
        console.error('Hiba az adatbázis kapcsolat létrehozásakor:', err);
    });

app.post('/api/register', async (req, res) => {
    const { username, password, birthDate, email, phone, address, gender, lastName, firstName } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Hiányosan kitöltött mezők!' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Az email formátuma nem megfelelő!' });
    }

    try {
        const [existingUser] = await sequelize.query(
            `SELECT * FROM felhasznalok WHERE felhasznalonev = ? OR email_cim = ?`,
            {
                replacements: [username, email],
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (existingUser) {
            return res.status(409).json({ error: 'A felhasználó már létezik. Válasszon másik felhasználónevet vagy email címet!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await sequelize.query(
            `INSERT INTO felhasznalok 
            (felhasznalonev, jelszo, szuletesi_datum, email_cim, telefonszam, lakcim, nem, vezeteknev, keresztnev) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            {
                replacements: [username, hashedPassword, birthDate, email, phone, address, gender, lastName, firstName],
                type: sequelize.QueryTypes.INSERT
            }
        );

        res.status(201).json({ message: 'Felhasználó sikeresen regisztrálva!', userId: result[0] });
    } catch (error) {
        console.error('Hiba a regisztráció során:', error);
        res.status(500).json({ error: 'A regisztráció sikertelen!' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Add meg a felhasználóneved és a jelszavad!' });
    }

    try {
        const [user] = await sequelize.query(
            `SELECT * FROM felhasznalok WHERE felhasznalonev = ?`,
            {
                replacements: [username],
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (!user) {
            console.warn('Érvénytelen felhasználónév:', username);
            return res.status(401).json({ message: 'Érvénytelen felhasználónév vagy jelszó!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.jelszo);
        if (!isPasswordValid) {
            console.warn('Érvénytelen jelszó:', username);
            return res.status(401).json({ message: 'Érvénytelen felhasználónév vagy jelszó!' });
        }

        res.status(200).json({ message: 'Bejelentkezés sikeres!', user });
    } catch (error) {
        console.error('Hiba a bejelentkezés során:', error);
        res.status(500).json({ error: 'A bejelentkezés sikertelen!' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton`);
});
