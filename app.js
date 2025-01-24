const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize'); // Az Op importálása
const User = require('./models/user'); // Import the User model

// Initialize Express app
const app = express();

// Middleware for handling CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Configure Sequelize for database connection
const sequelize = new Sequelize('webaruhaz', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Sikeres adatbázis kapcsolat!');
    })
    .catch(err => {
        console.error('Hiba az adatbázis kapcsolat létrehozásakor:', err.message);
    });

// Import routes
const authRoutes = require('./routes/auth')(User ); // Pass the User model
const passwordRoutes = require('./routes/password')(User ); // Pass the User model

// Use routes
app.use('/api', authRoutes);
app.use('/api', passwordRoutes);

// Route: Fetch Clothing Items
app.get('/api/polok', async (req, res) => {
    try {
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

app.get('/api/pulcsik', async (req, res) => {
    try {
        const PulloverItems = await sequelize.query(
            `SELECT * FROM pulcsik`,
            {
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.status(200).json(PulloverItems);
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
