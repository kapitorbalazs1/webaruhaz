const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.get('/', (req,res) =>{
    res.status(200).json({
        status: 'siker',
    })
})

const port = 3000;
app.listen(port,() => {
    console.log(`A szerver fut a ${port}-es porton`);
});