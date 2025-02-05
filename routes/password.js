const express = require('express');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const router = express.Router();

module.exports = (Felhasznalo) => {
  router.post('/elfelejtett-jelszo', async (req, res) => {
    const { azonosito, biztonsagi_kerdes, biztonsagi_valasz } = req.body;

    if (!azonosito || !biztonsagi_kerdes || !biztonsagi_valasz) {
      return res.status(400).json({ uzenet: 'Minden mezőt ki kell tölteni!' });
    }

    try {
      const felhasznalo = await Felhasznalo.findOne({
        where: {
          [Op.or]: [
            { email_cim: azonosito },
            { felhasznalonev: azonosito }
          ]
        }
      });

      if (!felhasznalo) {
        return res.status(404).json({ uzenet: 'Nem található ilyen felhasználó.' });
      }

      if (
        felhasznalo.biztonsagi_kerdes.toLowerCase() !== biztonsagi_kerdes.toLowerCase() ||
        felhasznalo.biztonsagi_valasz.toLowerCase() !== biztonsagi_valasz.toLowerCase()
      ) {
        return res.status(401).json({ uzenet: 'Hibás biztonsági kérdés vagy válasz.' });
      }

      res.status(200).json({ uzenet: '✅ Sikeres azonosítás! Most már megváltoztathatod a jelszavadat.' });
    } catch (hiba) {
      console.error('❌ Hiba történt a jelszó visszaállításakor:', hiba.message);
      res.status(500).json({ uzenet: 'Váratlan hiba történt.' });
    }
  });

  router.post('/jelszo-modositas', async (req, res) => {
    const { azonosito, jelszo } = req.body;

    if (!azonosito || !jelszo) {
      return res.status(400).json({ uzenet: 'Minden mezőt ki kell tölteni!' });
    }

    const jelszoMinta = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!jelszoMinta.test(jelszo)) {
      return res.status(400).json({ uzenet: 'A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell kis- és nagybetűket, számot, és speciális karaktert (pl. @$!%*?&).' });
    }

    try {
      const titkositottJelszo = await bcrypt.hash(jelszo, 10);

      await Felhasznalo.update(
        { jelszo: titkositottJelszo },
        {
          where: {
            [Op.or]: [
              { email_cim: azonosito },
              { felhasznalonev: azonosito }
            ]
          }
        }
      );

      res.status(200).json({ uzenet: '✅ A jelszó sikeresen módosítva!' });
    } catch (hiba) {
      console.error('❌ Hiba történt a jelszó módosításakor:', hiba.message);
      res.status(500).json({ uzenet: 'Váratlan hiba történt.' });
    }
  });

  return router;
};
