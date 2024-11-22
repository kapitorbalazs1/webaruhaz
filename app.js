const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'webaruhaz'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL kapcsolat sikeres');
});


app.get('/', (req, res) => {
    res.status(200).json({
        status: 'siker',
    });
});

app.get('/felhasznalok', (req, res) => {
    const sql = 'SELECT * FROM felhasznalok';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ hiba: err.üzenet });
        }
        if (results.length === 0) {
            return res.status(200).json({ üzenet: 'A tábla üres' });
        }
        res.status(200).json(results);
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton`);
});
