require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

const Felhasznalo = sequelize.define('Felhasznalo', {
    felhasznalonev: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    jelszo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    szuletesi_datum: {
        type: DataTypes.DATE,
        allowNull: true
    },
    email_cim: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefonszam: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lakcim: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nem: {
        type: DataTypes.STRING,
        allowNull: true
    },
    vezeteknev: {
        type: DataTypes.STRING,
        allowNull: true
    },
    keresztnev: {
        type: DataTypes.STRING,
        allowNull: true
    },
    biztonsagi_kerdes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biztonsagi_valasz: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'felhasznalok',
    timestamps: false
});

module.exports = Felhasznalo;
