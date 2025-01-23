const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

// Initialize Express app
const app = express();

// Middleware for handling CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Configure Sequelize for database connection
const sequelize = new Sequelize('webaruhaz', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false // Disable SQL logging in the console for cleaner output
});

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Sikeres adatbázis kapcsolat!');
    })
    .catch(err => {
        console.error('Hiba az adatbázis kapcsolat létrehozásakor:', err.message);
    });

// Route: User Registration
app.post('/api/register', async (req, res) => {
    const { username, password, birthDate, email, phone, address, gender, lastName, firstName, biztonsagi_kerdes, biztonsagi_valasz } = req.body;

    // Basic input validation
    if (!username || !password || !email || !biztonsagi_kerdes || !biztonsagi_valasz) {
        return res.status(400).json({ error: 'Hiányosan kitöltött mezők! A felhasználónév, jelszó, email, biztonsági kérdés és válasz kötelező.' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Az email cím formátuma nem megfelelő!' });
    }

    try {
        // Check if username or email already exists
        const [existingUser ] = await sequelize.query(
            `SELECT * FROM felhasznalok WHERE felhasznalonev = ? OR email_cim = ?`,
            {
                replacements: [username, email],
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (existingUser ) {
            return res.status(409).json({ error: 'A felhasználónév vagy az email cím már használatban van.' });
        }

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const result = await sequelize.query(
            `INSERT INTO felhasznalok 
            (felhasznalonev, jelszo, szuletesi_datum, email_cim, telefonszam, lakcim, nem, vezeteknev, keresztnev, biztonsagi_kerdes, biztonsagi_valasz) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            {
                replacements: [username, hashedPassword, birthDate, email, phone, address, gender, lastName, firstName, biztonsagi_kerdes, biztonsagi_valasz],
                type: sequelize.QueryTypes.INSERT
            }
        );

        // Respond with success
        res.status(201).json({ message: 'Felhasználó sikeresen regisztrálva!', userId: result[0] });
    } catch (error) {
        console.error('Hiba a regisztráció során:', error.message);
        res.status(500).json({ error: 'Váratlan hiba történt a regisztráció során.' });
    }
});

// Route: User Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
        return res.status(400).json({ error: 'A felhasználónév és a jelszó megadása kötelező!' });
    }

    try {
        // Fetch user by username
        const [user] = await sequelize.query(
            `SELECT * FROM felhasznalok WHERE felhasznalonev = ?`,
            {
                replacements: [username],
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (!user) {
            return res.status(401).json({ error: 'Hibás felhasználónév vagy jelszó!' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.jelszo);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Hibás felhasználónév vagy jelszó!' });
        }

        // Successful login
        res.status(200).json({ message: 'Bejelentkezés sikeres!', user: { id: user.id, username: user.felhasznalonev, email: user.email_cim } });
    } catch (error) {
        console.error('Hiba a bejelentkezés során:', error.message);
        res.status(500).json({ error: 'Váratlan hiba történt a bejelentkezés során.' });
    }
});

app.post('/api/forgot-password', async (req, res) => {
    const { email, biztonsagi_kerdes, biztonsagi_valasz } = req.body;

    // Validate input
    if (!email || !biztonsagi_kerdes || !biztonsagi_valasz) {
        return res.status(400).json({ message: 'Kérjük, töltse ki az összes mezőt.' });
    }

    try {
        // Fetch user by email
        const [user] = await sequelize.query(
            `SELECT * FROM felhasznalok WHERE email_cim = ?`,
            {
                replacements: [email],
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (!user) {
            return res.status(404).json({ message: 'Felhasználó nem található.' });
        }

        // Check security question and answer
        if (user.biztonsagi_kerdes !== biztonsagi_kerdes || user.biztonsagi_valasz !== biztonsagi_valasz) {
            return res.status(401).json({ message: 'Hibás biztonsági kérdés vagy válasz.' });
        }

        // Here you would typically send an email with a password reset link
        // For simplicity, we will just return a success message
        res.status(200).json({ message: 'Ellenőrizze az email fiókját a jelszó visszaállításához!' });
    } catch (error) {
        console.error('Hiba a jelszó visszaállítása során:', error.message);
        res.status(500).json({ message: 'Váratlan hiba történt a jelszó visszaállítása során.' });
    }
});

// Route: Change Password
app.post('/api/change-password', async (req, res) => {
    const { email, newPassword } = req.body;

    // Validate input
    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Kérjük, töltse ki az összes mezőt.' });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await sequelize.query(
            `UPDATE felhasznalok SET jelszo = ? WHERE email_cim = ?`,
            {
                replacements: [hashedPassword, email],
                type: sequelize.QueryTypes.UPDATE
            }
        );

        res.status(200).json({ message: 'A jelszó sikeresen módosítva!' });
    } catch (error) {
        console.error('Hiba a jelszó módosítása során:', error.message);
        res.status(500).json({ message: 'Váratlan hiba történt a jelszó módosítása során.' });
    }
});

// Route: Fetch Clothing Items
app.get('/api/polok', async (req, res) => {
    try {
        // Fetch all clothing items from the database
        const clothingItems = await sequelize.query(
            `SELECT * FROM polok`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json(clothingItems);
    } catch (error) {
        console.error('Hiba a ruhák lekérdezése során:', error.message);
        res.status(500).json({ error: 'Nem sikerült lekérdezni a ruhák listáját. Próbáld újra később!' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton. Látogasd meg a http://localhost:${port} címet!`);
});
