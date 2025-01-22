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
    const { username, password, birthDate, email, phone, address, gender, lastName, firstName } = req.body;

    // Basic input validation
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Hiányosan kitöltött mezők! A felhasználónév, jelszó és email kötelező.' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Az email cím formátuma nem megfelelő!' });
    }

    try {
        // Check if username or email already exists
        const [existingUser] = await sequelize.query(
            `SELECT * FROM felhasznalok WHERE felhasznalonev = ? OR email_cim = ?`,
            {
                replacements: [username, email],
                type: sequelize.QueryTypes.SELECT
            }
        );

        if (existingUser) {
            return res.status(409).json({ error: 'A felhasználónév vagy az email cím már használatban van.' });
        }

        // Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const result = await sequelize.query(
            `INSERT INTO felhasznalok 
            (felhasznalonev, jelszo, szuletesi_datum, email_cim, telefonszam, lakcim, nem, vezeteknev, keresztnev) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            {
                replacements: [username, hashedPassword, birthDate, email, phone, address, gender, lastName, firstName],
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

// Route: Fetch Clothing Items
app.get('/api/ruhak', async (req, res) => {
    try {
        // Fetch all clothing items from the database
        const clothingItems = await sequelize.query(
            `SELECT * FROM ruhak`,
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
