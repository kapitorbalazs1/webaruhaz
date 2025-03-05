-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 05. 12:41
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webaruhaz`
--
CREATE DATABASE IF NOT EXISTS `webaruhaz` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `webaruhaz`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `vezeteknev` varchar(50) NOT NULL,
  `keresztnev` varchar(50) NOT NULL,
  `felhasznalonev` varchar(50) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `szuletesi_datum` date NOT NULL,
  `email_cim` varchar(100) NOT NULL,
  `telefonszam` varchar(15) NOT NULL,
  `lakcim` varchar(255) NOT NULL,
  `nem` varchar(10) NOT NULL,
  `biztonsagi_kerdes` varchar(100) NOT NULL,
  `biztonsagi_valasz` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `vezeteknev`, `keresztnev`, `felhasznalonev`, `jelszo`, `szuletesi_datum`, `email_cim`, `telefonszam`, `lakcim`, `nem`, `biztonsagi_kerdes`, `biztonsagi_valasz`) VALUES
(1, 'teszt2', '123', 'teszt2', '$2b$10$PPxkxMNl407dVquNjvFXjuJ4YARJuHG13H1YZS8v4q8uqYP8Bc1bO', '0006-07-08', 'teszt2@gmail.com', '06701234567', '5', 'ferfi', '12', '1'),
(2, 'teszt1', '123', 'teszt1', '$2b$10$IkBpKf7TF.KiqCkQkch9KO.TAILiXGhPMlRqtidG1SyICicCBmf2W', '0007-08-09', 'teszt1@gmail.com', '06701234567', '5', 'ferfi', '12', '1'),
(3, 'teszt3', '123', 'teszt3', '$2b$10$ldrDl/BXPiEhYZAcWOLYRu6mJphOZ4s6.alcMQeem1/n4dNdadc8K', '0006-07-08', 'teszt3@gmail.com', '06701234567', '5', 'ferfi', '12', '1');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ingek`
--

CREATE TABLE `ingek` (
  `id` int(11) NOT NULL,
  `ar` int(11) NOT NULL,
  `meret` varchar(5) NOT NULL,
  `anyag` varchar(50) NOT NULL,
  `marka` varchar(50) NOT NULL,
  `szin` varchar(20) NOT NULL,
  `leiras` varchar(100) NOT NULL,
  `nem` varchar(10) NOT NULL,
  `kep_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ingek`
--

INSERT INTO `ingek` (`id`, `ar`, `meret`, `anyag`, `marka`, `szin`, `leiras`, `nem`, `kep_url`) VALUES
(1, 4990, 'M', 'Pamut', 'Zara', 'Fehér', 'Klasszikus fehér ing', 'Férfi', './src/assets/ingek/ing1.jpg'),
(2, 6990, 'L', 'Poliészter', 'H&M', 'Kék', 'Elegáns kék ing', 'Női', './src/assets/ingek/ing2.jpg'),
(3, 3990, 'S', 'Pamut', 'Nike', 'Zöld', 'Sportos zöld ing', 'Férfi', './src/assets/ingek/ing3.jpg'),
(4, 7990, 'M', 'Bársony', 'Mango', 'Barna', 'Divatos barna bársony ing', 'Női', './src/assets/ingek/ing4.jpg'),
(5, 5990, 'XL', 'Poliészter', 'Adidas', 'Piros', 'Kényelmes piros ing', 'Férfi', './src/assets/ingek/ing5.jpg'),
(6, 4990, 'M', 'Pamut', 'Puma', 'Szürke', 'Klasszikus szürke ing', 'Férfi', './src/assets/ingek/ing6.jpg'),
(7, 6990, 'L', 'Poliészter', 'Bershka', 'Fekete', 'Elegáns fekete ing', 'Női', './src/assets/ingek/ing7.jpg'),
(8, 3990, 'S', 'Pamut', 'Reebok', 'Narancs', 'Sportos narancs ing', 'Férfi', './src/assets/ingek/ing8.jpg'),
(9, 7990, 'XL', 'Bársony', 'Levi\'s', 'Kék', 'Divatos kék bársony ing', 'Női', './src/assets/ingek/ing9.jpg'),
(10, 5990, 'M', 'Poliészter', 'Zara', 'Zöld', 'Kényelmes zöld ing', 'Férfi', './src/assets/ingek/ing10.jpg'),
(11, 4990, 'L', 'Pamut', 'H&M', 'Fehér', 'Klasszikus fehér ing', 'Női', './src/assets/ingek/ing11.jpg'),
(12, 6990, 'S', 'Poliészter', 'Nike', 'Szürke', 'Elegáns szürke ing', 'Férfi', './src/assets/ingek/ing12.jpg'),
(13, 3990, 'M', 'Pamut', 'Puma', 'Kék', 'Sportos kék ing', 'Női', './src/assets/ingek/ing13.jpg'),
(14, 7990, 'L', 'Bársony', 'Mango', 'Barna', 'Divatos barna ing', 'Férfi', './src/assets/ingek/ing14.jpg'),
(15, 5990, 'XL', 'Poliészter', 'Adidas', 'Piros', 'Kényelmes piros ing', 'Női', './src/assets/ingek/ing15.jpg'),
(16, 4990, 'M', 'Pamut', 'Bershka', 'Fekete', 'Klasszikus fekete ing', 'Férfi', './src/assets/ingek/ing16.jpg'),
(17, 6990, 'L', 'Poliészter', 'Reebok', 'Narancs', 'Elegáns narancs ing', 'Női', './src/assets/ingek/ing17.jpg'),
(18, 3990, 'S', 'Pamut', 'Levi\'s', 'Zöld', 'Sportos zöld ing', 'Férfi', './src/assets/ingek/ing18.jpg'),
(19, 7990, 'XL', 'Bársony', 'Zara', 'Kék', 'Divatos kék ing', 'Női', './src/assets/ingek/ing19.jpg'),
(20, 5990, 'M', 'Poliészter', 'H&M', 'Szürke', 'Kényelmes szürke ing', 'Férfi', './src/assets/ingek/ing20.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kabatok`
--

CREATE TABLE `kabatok` (
  `id` int(11) NOT NULL,
  `ar` int(11) NOT NULL,
  `meret` varchar(5) NOT NULL,
  `anyag` varchar(50) NOT NULL,
  `marka` varchar(50) NOT NULL,
  `szin` varchar(20) NOT NULL,
  `leiras` varchar(100) NOT NULL,
  `nem` varchar(10) NOT NULL,
  `kep_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `kabatok`
--

INSERT INTO `kabatok` (`id`, `ar`, `meret`, `anyag`, `marka`, `szin`, `leiras`, `nem`, `kep_url`) VALUES
(1, 19990, 'M', 'Pamut', 'Zara', 'Fekete', 'Elegáns fekete kabát', 'Férfi', './src/assets/kabatok/kabat1.jpg'),
(2, 24990, 'L', 'Gyapjú', 'H&M', 'Szürke', 'Meleg gyapjú kabát', 'Női', './src/assets/kabatok/kabat2.jpg'),
(3, 15990, 'S', 'Poliészter', 'Nike', 'Kék', 'Sportos kék kabát', 'Férfi', './src/assets/kabatok/kabat3.jpg'),
(4, 29990, 'M', 'Bőr', 'Mango', 'Barna', 'Divatos barna kabát', 'Női', './src/assets/kabatok/kabat4.jpg'),
(5, 17990, 'XL', 'Nylon', 'Adidas', 'Piros', 'Vízálló piros kabát', 'Férfi', './src/assets/kabatok/kabat5.jpg'),
(6, 21990, 'M', 'Gyapjú', 'Puma', 'Zöld', 'Kényelmes zöld kabát', 'Férfi', './src/assets/kabatok/kabat6.jpg'),
(7, 25990, 'L', 'Bőr', 'Bershka', 'Fekete', 'Stílusos fekete bőrkabát', 'Női', './src/assets/kabatok/kabat7.jpg'),
(8, 19990, 'S', 'Poliészter', 'Reebok', 'Narancs', 'Fényvisszaverő narancs kabát', 'Férfi', './src/assets/kabatok/kabat8.jpg'),
(9, 27990, 'XL', 'Pamutszövet', 'Levi\'s', 'Kék', 'Divatos kék pamut kabát', 'Női', './src/assets/kabatok/kabat9.jpg'),
(10, 15990, 'M', 'Nylon', 'Adidas', 'Szürke', 'Könnyű szürke nylon kabát', 'Férfi', './src/assets/kabatok/kabat10.jpg'),
(11, 23990, 'L', 'Poliészter', 'Puma', 'Piros', 'Sportos piros kabát', 'Női', './src/assets/kabatok/kabat11.jpg'),
(12, 19990, 'S', 'Gyapjú', 'H&M', 'Fekete', 'Meleg fekete gyapjú kabát', 'Férfi', './src/assets/kabatok/kabat12.jpg'),
(13, 24990, 'M', 'Gyapjú', 'Mango', 'Barna', 'Divatos barna gyapjú kabát', 'Női', './src/assets/kabatok/kabat13.jpg'),
(14, 17990, 'XL', 'Nylon', 'Nike', 'Kék', 'Vízálló kék nylon kabát', 'Férfi', './src/assets/kabatok/kabat14.jpg'),
(15, 21990, 'M', 'Pamut', 'Zara', 'Zöld', 'Kényelmes zöld pamut kabát', 'Női', './src/assets/kabatok/kabat15.jpg'),
(16, 25990, 'L', 'Gyapjú', 'Bershka', 'Szürke', 'Stílusos szürke gyapjú kabát', 'Férfi', './src/assets/kabatok/kabat16.jpg'),
(17, 19990, 'S', 'Poliészter', 'Adidas', 'Narancs', 'Fényvisszaverő narancs kabát', 'Női', './src/assets/kabatok/kabat17.jpg'),
(18, 27990, 'XL', 'Bőr', 'Puma', 'Fekete', 'Divatos fekete bőrkabát', 'Férfi', './src/assets/kabatok/kabat18.jpg'),
(19, 15990, 'M', 'Nylon', 'Reebok', 'Kék', 'Könnyű kék nylon kabát', 'Női', './src/assets/kabatok/kabat19.jpg'),
(20, 23990, 'L', 'Pamut', 'Levi\'s', 'Piros', 'Kényelmes piros pamut kabát', 'Férfi', './src/assets/kabatok/kabat20.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `nadragok`
--

CREATE TABLE `nadragok` (
  `id` int(11) NOT NULL,
  `ar` int(11) NOT NULL,
  `meret` varchar(5) NOT NULL,
  `anyag` varchar(50) NOT NULL,
  `marka` varchar(50) NOT NULL,
  `szin` varchar(20) NOT NULL,
  `leiras` varchar(100) NOT NULL,
  `nem` varchar(10) NOT NULL,
  `kep_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `nadragok`
--

INSERT INTO `nadragok` (`id`, `ar`, `meret`, `anyag`, `marka`, `szin`, `leiras`, `nem`, `kep_url`) VALUES
(1, 7990, 'M', 'Pamut', 'Levi\'s', 'Kék', 'Kényelmes Farmer, Ideális Mindennapokra', 'Férfi', './src/assets/nadragok/nadrag1.jpg'),
(2, 5990, 'L', 'Poliészter', 'H&M', 'Fekete', 'Sportos Nadrág, Tökéletes Futáshoz', 'Női', './src/assets/nadragok/nadrag2.jpg'),
(3, 8990, 'S', 'Vászon', 'Zara', 'Zöld', 'Elegáns Nadrág, Különleges Eseményekre', 'Férfi', './src/assets/nadragok/nadrag3.jpg'),
(4, 7490, 'M', 'Denim', 'Lee', 'Szürke', 'Klasszikus Farmer, Minden Alkalomra', 'Női', './src/assets/nadragok/nadrag4.jpg'),
(5, 10990, 'XL', 'Pamut', 'Nike', 'Piros', 'Sportos Nadrág, Kényelmes Edzéshez', 'Férfi', './src/assets/nadragok/nadrag5.jpg'),
(6, 6490, 'M', 'Poliészter', 'Adidas', 'Sötétkék', 'Futónadrág, Kiváló Szellőzés', 'Női', './src/assets/nadragok/nadrag6.jpg'),
(7, 7990, 'L', 'Vászon', 'Puma', 'Barna', 'Kényelmes Halásznadrág, Tökéletes Mindennapokhoz', 'Férfi', './src/assets/nadragok/nadrag7.jpg'),
(8, 4990, 'S', 'Pamut', 'Mango', 'Fekete', 'Rövid Nadrág, Ideális Nyári Napokra', 'Női', './src/assets/nadragok/nadrag8.jpg'),
(9, 10990, 'M', 'Denim', 'Wrangler', 'Kék', 'Divatos Farmer, Trendy Megjelenés', 'Férfi', './src/assets/nadragok/nadrag9.jpg'),
(10, 6990, 'L', 'Poliészter', 'Bershka', 'Szürke', 'Sportos Leggings, Kényelmes Viselés', 'Női', './src/assets/nadragok/nadrag10.jpg'),
(11, 8490, 'XL', 'Vászon', 'Pull&Bear', 'Zöld', 'Kényelmes Nadrág, Tökéletes Mindennapokra', 'Férfi', './src/assets/nadragok/nadrag11.jpg'),
(12, 5990, 'S', 'Pamut', 'Stradivarius', 'Piros', 'Rövid Farmer, Kényelmes és Stílusos', 'Női', './src/assets/nadragok/nadrag12.jpg'),
(13, 7990, 'M', 'Denim', 'Levi\'s', 'Kék', 'Klasszikus Farmer, Minden Alkalomra', 'Férfi', './src/assets/nadragok/nadrag13.jpg'),
(14, 10990, 'L', 'Poliészter', 'H&M', 'Fekete', 'Sportos Nadrág, Kényelmes Edzéshez', 'Női', './src/assets/nadragok/nadrag14.jpg'),
(15, 6490, 'S', 'Vászon', 'Zara', 'Zöld', 'Elegáns Nadrág, Különleges Eseményekre', 'Férfi', './src/assets/nadragok/nadrag15.jpg'),
(16, 7490, 'M', 'Denim', 'Lee', 'Szürke', 'Kényelmes Farmer, Ideális Mindennapokra', 'Női', './src/assets/nadragok/nadrag16.jpg'),
(17, 10990, 'XL', 'Pamut', 'Nike', 'Piros', 'Sportos Nadrág, Kiváló Edzéshez', 'Férfi', './src/assets/nadragok/nadrag17.jpg'),
(18, 5990, 'M', 'Poliészter', 'Adidas', 'Sötétkék', 'Futónadrág, Kiváló Szellőzés', 'Női', './src/assets/nadragok/nadrag18.jpg'),
(19, 7990, 'L', 'Vászon', 'Puma', 'Barna', 'Kényelmes Nadrág, Tökéletes Pihenéshez', 'Férfi', './src/assets/nadragok/nadrag19.jpg'),
(20, 4990, 'S', 'Pamut', 'Mango', 'Fekete', 'Rövid Nadrág, Ideális Nyári Napokra', 'Női', './src/assets/nadragok/nadrag20.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `polok`
--

CREATE TABLE `polok` (
  `id` int(11) NOT NULL,
  `ar` int(11) NOT NULL,
  `meret` varchar(10) NOT NULL,
  `anyag` varchar(50) NOT NULL,
  `marka` varchar(50) NOT NULL,
  `szin` varchar(20) NOT NULL,
  `leiras` text DEFAULT NULL,
  `nem` varchar(10) NOT NULL,
  `kep_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `polok`
--

INSERT INTO `polok` (`id`, `ar`, `meret`, `anyag`, `marka`, `szin`, `leiras`, `nem`, `kep_url`) VALUES
(1, 5000, 'M', 'Pamut', 'Nike', 'Kék', 'Kényelmes pamut póló', 'Férfi', './src/assets/polok/polo1.jpg'),
(2, 6000, 'L', 'Pamut', 'Adidas', 'Zöld', 'Sportos pamut póló', 'Férfi', './src/assets/polok/polo2.jpg'),
(3, 4500, 'S', 'Pamut', 'Puma', 'Fekete', 'Klasszikus pamut póló', 'Férfi', './src/assets/polok/polo3.jpg'),
(4, 7000, 'M', 'Poliészter', 'Reebok', 'Fehér', 'Futó póló', 'Férfi', './src/assets/polok/polo4.jpg'),
(5, 8000, 'XL', 'Pamut', 'Under Armour', 'Szürke', 'Kényelmes edző póló', 'Férfi', './src/assets/polok/polo5.jpg'),
(6, 5500, 'M', 'Pamut', 'H&M', 'Kék', 'Divatos pamut póló', 'Férfi', './src/assets/polok/polo6.jpg'),
(7, 6500, 'L', 'Pamut', 'Zara', 'Piros', 'Stílusos pamut póló', 'Férfi', './src/assets/polok/polo7.jpg'),
(8, 4800, 'S', 'Pamut', 'Mango', 'Fehér', 'Kényelmes női póló', 'Női', './src/assets/polok/polo8.jpg'),
(9, 7200, 'M', 'Poliészter', 'Nike', 'Fekete', 'Futó póló női', 'Női', './src/assets/polok/polo9.jpg'),
(10, 7500, 'XL', 'Pamut', 'Adidas', 'Zöld', 'Sportos női póló', 'Női', './src/assets/polok/polo10.jpg'),
(11, 5000, 'M', 'Pamut', 'Levi\'s', 'Kék', 'Klasszikus farmer póló', 'Férfi', './src/assets/polok/polo11.jpg'),
(12, 6000, 'L', 'Pamut', 'Tommy Hilfiger', 'Piros', 'Elegáns pamut póló', 'Férfi', './src/assets/polok/polo12.jpg'),
(13, 4500, 'S', 'Pamut', 'Calvin Klein', 'Szürke', 'Minimalista póló', 'Férfi', './src/assets/polok/polo13.jpg'),
(14, 7000, 'M', 'Poliészter', 'New Balance', 'Fehér', 'Futó póló', 'Férfi', './src/assets/polok/polo14.jpg'),
(15, 8000, 'XL', 'Pamut', 'H&M', 'Kék', 'Kényelmes edző póló', 'Női', './src/assets/polok/polo15.jpg'),
(16, 5500, 'M', 'Pamut', 'Zara', 'Zöld', 'Divatos női póló', 'Női', './src/assets/polok/polo16.jpg'),
(17, 6500, 'L', 'Pamut', 'Mango', 'Fekete', 'Stílusos női póló', 'Női', './src/assets/polok/polo17.jpg'),
(18, 4800, 'S', 'Pamut', 'Nike', 'Fehér', 'Kényelmes női póló', 'Női', './src/assets/polok/polo18.jpg'),
(19, 7200, 'M', 'Poliészter', 'Adidas', 'Piros', 'Futó póló női', 'Női', './src/assets/polok/polo19.jpg'),
(20, 7500, 'XL', 'Pamut', 'Puma', 'Szürke', 'Sportos női póló', 'Női', './src/assets/polok/polo20.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pulcsik`
--

CREATE TABLE `pulcsik` (
  `id` int(11) NOT NULL,
  `ar` int(11) NOT NULL,
  `meret` varchar(10) NOT NULL,
  `anyag` varchar(50) NOT NULL,
  `marka` varchar(50) NOT NULL,
  `szin` varchar(20) NOT NULL,
  `leiras` text NOT NULL,
  `nem` varchar(10) NOT NULL,
  `kep_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `pulcsik`
--

INSERT INTO `pulcsik` (`id`, `ar`, `meret`, `anyag`, `marka`, `szin`, `leiras`, `nem`, `kep_url`) VALUES
(1, 10000, 'M', 'Pamut', 'Champion', 'Sötétkék', 'Kényelmes pulóver', 'Férfi', './src/assets/pulcsik/pulcsi1.jpg'),
(2, 12000, 'L', 'Pamut', 'Puma', 'Narancs', 'Sportos pulóver', 'Férfi', './src/assets/pulcsik/pulcsi2.jpg'),
(3, 9000, 'S', 'Pamut', 'Adidas', 'Szürke', 'Klasszikus pulóver', 'Férfi', './src/assets/pulcsik/pulcsi3.jpg'),
(4, 15000, 'M', 'Poliészter', 'New Balance', 'Kék', 'Futó pulóver', 'Férfi', './src/assets/pulcsik/pulcsi4.jpg'),
(5, 16000, 'XL', 'Pamut', 'H&M', 'Fekete', 'Kényelmes edző pulóver', 'Férfi', './src/assets/pulcsik/pulcsi5.jpg'),
(6, 11000, 'M', 'Pamut', 'Zara', 'Zöld', 'Divatos pulóver', 'Férfi', './src/assets/pulcsik/pulcsi6.jpg'),
(7, 13000, 'L', 'Pamut', 'Mango', 'Bordó', 'Stílusos pulóver', 'Férfi', './src/assets/pulcsik/pulcsi7.jpg'),
(8, 9600, 'S', 'Pamut', 'Nike', 'Rózsaszín', 'Kényelmes női pulóver', 'Női', './src/assets/pulcsik/pulcsi8.jpg'),
(9, 14500, 'M', 'Poliészter', 'Adidas', 'Fehér', 'Futó pulóver női', 'Női', './src/assets/pulcsik/pulcsi9.jpg'),
(10, 15500, 'XL', 'Pamut', 'Reebok', 'Kék', 'Sportos női pulóver', 'Női', './src/assets/pulcsik/pulcsi10.jpg'),
(11, 10000, 'M', 'Pamut', 'Levi\'s', 'Szürke', 'Klasszikus farmer pulóver', 'Férfi', './src/assets/pulcsik/pulcsi11.jpg'),
(12, 12000, 'L', 'Pamut', 'Tommy Hilfiger', 'Piros', 'Elegáns pulóver', 'Férfi', './src/assets/pulcsik/pulcsi12.jpg'),
(13, 9000, 'S', 'Pamut', 'Calvin Klein', 'Fekete', 'Minimalista pulóver', 'Férfi', './src/assets/pulcsik/pulcsi13.jpg'),
(14, 15000, 'M', 'Poliészter', 'Under Armour', 'Fehér', 'Futó pulóver', 'Férfi', './src/assets/pulcsik/pulcsi14.jpg'),
(15, 16000, 'XL', 'Pamut', 'H&M', 'Kék', 'Kényelmes edző pulóver', 'Női', './src/assets/pulcsik/pulcsi15.jpg'),
(16, 11000, 'M', 'Pamut', 'Zara', 'Zöld', 'Divatos női pulóver', 'Női', './src/assets/pulcsik/pulcsi16.jpg'),
(17, 13000, 'L', 'Pamut', 'Mango', 'Fekete', 'Stílusos női pulóver', 'Női', './src/assets/pulcsik/pulcsi17.jpg'),
(18, 9600, 'S', 'Pamut', 'Nike', 'Fehér', 'Kényelmes női pulóver', 'Női', './src/assets/pulcsik/pulcsi18.jpg'),
(19, 14500, 'M', 'Poliészter', 'Adidas', 'Piros', 'Futó pulóver női', 'Női', './src/assets/pulcsik/pulcsi19.jpg'),
(20, 15500, 'XL', 'Pamut', 'Puma', 'Szürke', 'Sportos női pulóver', 'Női', './src/assets/pulcsik/pulcsi20.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles_adatok`
--

CREATE TABLE `rendeles_adatok` (
  `id` int(11) NOT NULL,
  `felhasznalonev` varchar(50) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `rendeles_datum` datetime NOT NULL,
  `osszeg` int(11) NOT NULL,
  `szallitasi_cim` text NOT NULL,
  `pdf_fajl` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles_adatok`
--

INSERT INTO `rendeles_adatok` (`id`, `felhasznalonev`, `nev`, `rendeles_datum`, `osszeg`, `szallitasi_cim`, `pdf_fajl`) VALUES
(1, 'teszt2', 'Teszt255', '2025-03-03 10:31:18', 6637, '1566', 'rendeles_1740994278389.pdf'),
(2, 'teszt2', 'Teszt23', '2025-03-03 10:32:20', 14200, '1566', 'rendeles_1740994340056.pdf'),
(3, 'teszt3', 'Teszt3', '2025-03-05 12:41:21', 6637, '156', 'rendeles_1741174880678.pdf');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `ingek`
--
ALTER TABLE `ingek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kabatok`
--
ALTER TABLE `kabatok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `nadragok`
--
ALTER TABLE `nadragok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `polok`
--
ALTER TABLE `polok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `pulcsik`
--
ALTER TABLE `pulcsik`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rendeles_adatok`
--
ALTER TABLE `rendeles_adatok`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `rendeles_adatok`
--
ALTER TABLE `rendeles_adatok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
