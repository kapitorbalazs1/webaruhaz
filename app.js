const express = require('express');
const { Sequelize } = require('sequelize');
const app = express();
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
        console.error('Hiba a kapcsolat létrehozásakor:', err);
    });

app.get('/', async (req, res) => {
    try {
        const results = await sequelize.query('SELECT COUNT(*) AS count FROM ruhak', {
            type: sequelize.QueryTypes.SELECT
        });
        const count = results[0].count;

        if (count === 0) {
            return res.status(200).json({
                status: 'sikeres kapcsolat',
                uzenet: 'A megadott tábla üres',
            });
        } else {
            return res.status(200).json({
                status: 'siker',
                uzenet: `A ruhak tábla nem üres, ${count} elem található.`,
            });
        }
    } catch (hiba) {
        console.error('Query Error:', hiba);
        return res.status(500).json({
            status: 'hiba',
            uzenet: 'Hiba a lekérdezés során.',
            reszletek: hiba.message
        });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton`);
});
