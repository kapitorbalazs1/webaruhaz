-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 24. 12:52
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
  `telefonszam` varchar(15) DEFAULT NULL,
  `lakcim` varchar(255) DEFAULT NULL,
  `nem` varchar(10) NOT NULL,
  `biztonsagi_kerdes` varchar(100) NOT NULL,
  `biztonsagi_valasz` varchar(100) DEFAULT NULL,
  `meret_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `vezeteknev`, `keresztnev`, `felhasznalonev`, `jelszo`, `szuletesi_datum`, `email_cim`, `telefonszam`, `lakcim`, `nem`, `biztonsagi_kerdes`, `biztonsagi_valasz`, `meret_id`) VALUES
(1, 'teszt2', '123', 'teszt2', '$2b$10$PPxkxMNl407dVquNjvFXjuJ4YARJuHG13H1YZS8v4q8uqYP8Bc1bO', '0006-07-08', 'teszt2@gmail.com', '06701234567', '5', 'ferfi', '12', '1', NULL);

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
  `leiras` text DEFAULT NULL,
  `nem` varchar(10) NOT NULL,
  `kep_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `pulcsik`
--

INSERT INTO `pulcsik` (`id`, `ar`, `meret`, `anyag`, `marka`, `szin`, `leiras`, `nem`, `kep_url`) VALUES
(1, 10000, 'M', 'Pamut', 'Nike', 'Kék', 'Kényelmes pulóver', 'Férfi', './src/assets/pulcsik/pulcsi1.jpg'),
(2, 12000, 'L', 'Pamut', 'Adidas', 'Zöld', 'Sportos pulóver', 'Férfi', './src/assets/pulcsik/pulcsi2.jpg'),
(3, 9000, 'S', 'Pamut', 'Puma', 'Fekete', 'Klasszikus pulóver', 'Férfi', './src/assets/pulcsik/pulcsi3.jpg'),
(4, 15000, 'M', 'Poliészter', 'Reebok', 'Fehér', 'Futó pulóver', 'Férfi', './src/assets/pulcsik/pulcsi4.jpg'),
(5, 16000, 'XL', 'Pamut', 'Under Armour', 'Szürke', 'Kényelmes edző pulóver', 'Férfi', './src/assets/pulcsik/pulcsi5.jpg'),
(6, 11000, 'M', 'Pamut', 'H&M', 'Kék', 'Divatos pulóver', 'Férfi', './src/assets/pulcsik/pulcsi6.jpg'),
(7, 13000, 'L', 'Pamut', 'Zara', 'Piros', 'Stílusos pulóver', 'Férfi', './src/assets/pulcsik/pulcsi7.jpg'),
(8, 9600, 'S', 'Pamut', 'Mango', 'Fehér', 'Kényelmes női pulóver', 'Női', './src/assets/pulcsik/pulcsi8.jpg'),
(9, 14500, 'M', 'Poliészter', 'Nike', 'Fekete', 'Futó pulóver női', 'Női', './src/assets/pulcsik/pulcsi9.jpg'),
(10, 15500, 'XL', 'Pamut', 'Adidas', 'Zöld', 'Sportos női pulóver', 'Női', './src/assets/pulcsik/pulcsi10.jpg'),
(11, 10000, 'M', 'Pamut', 'Levi\'s', 'Kék', 'Klasszikus farmer pulóver', 'Férfi', './src/assets/pulcsik/pulcsi11.jpg'),
(12, 12000, 'L', 'Pamut', 'Tommy Hilfiger', 'Piros', 'Elegáns pulóver', 'Férfi', './src/assets/pulcsik/pulcsi12.jpg'),
(13, 9000, 'S', 'Pamut', 'Calvin Klein', 'Szürke', 'Minimalista pulóver', 'Férfi', './src/assets/pulcsik/pulcsi13.jpg'),
(14, 15000, 'M', 'Poliészter', 'New Balance', 'Fehér', 'Futó pulóver', 'Férfi', './src/assets/pulcsik/pulcsi14.jpg'),
(15, 16000, 'XL', 'Pamut', 'H&M', 'Kék', 'Kényelmes edző pulóver', 'Női', './src/assets/pulcsik/pulcsi15.jpg'),
(16, 11000, 'M', 'Pamut', 'Zara', 'Zöld', 'Divatos női pulóver', 'Női', './ src/assets/pulcsik/pulcsi16.jpg'),
(17, 13000, 'L', 'Pamut', 'Mango', 'Fekete', 'Stílusos női pulóver', 'Női', './src/assets/pulcsik/pulcsi17.jpg'),
(18, 9600, 'S', 'Pamut', 'Nike', 'Fehér', 'Kényelmes női pulóver', 'Női', './src/assets/pulcsik/pulcsi18.jpg'),
(19, 14500, 'M', 'Poliészter', 'Adidas', 'Piros', 'Futó pulóver női', 'Női', './src/assets/pulcsik/pulcsi19.jpg'),
(20, 15500, 'XL', 'Pamut', 'Puma', 'Szürke', 'Sportos női pulóver', 'Női', './src/assets/pulcsik/pulcsi20.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ruha_meretek`
--

CREATE TABLE `ruha_meretek` (
  `id` int(11) NOT NULL,
  `ruha_id` int(11) NOT NULL,
  `magassag` int(11) NOT NULL,
  `vallszelesseg` int(11) NOT NULL,
  `derekboseg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meret_id` (`meret_id`);

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
-- A tábla indexei `ruha_meretek`
--
ALTER TABLE `ruha_meretek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ruha_id` (`ruha_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT a táblához `polok`
--
ALTER TABLE `polok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `ruha_meretek`
--
ALTER TABLE `ruha_meretek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD CONSTRAINT `felhasznalok_ibfk_1` FOREIGN KEY (`meret_id`) REFERENCES `ruha_meretek` (`id`);

--
-- Megkötések a táblához `ruha_meretek`
--
ALTER TABLE `ruha_meretek`
  ADD CONSTRAINT `ruha_meretek_ibfk_1` FOREIGN KEY (`ruha_id`) REFERENCES `polok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
