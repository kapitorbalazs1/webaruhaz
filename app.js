const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webaruhaz'
});

connection.connect((err) => {
    if (err) {
        console.error('Hiba a kapcsolat létrehozásakor: ' + err.stack);
        return;
    }
    console.log('Sikeres adatbázis kapcsolat!');
});

app.get('/', (req, res) => {
    connection.query('SELECT COUNT(*) AS count FROM ruhak', (hiba, eredmenyek) => {
        if (hiba) {
            return res.status(500).json({
                status: 'hiba',
                uzenet: 'Hiba a lekérdezés során.',
            });
        }

        const count = eredmenyek[0].count;
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
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton`);
});