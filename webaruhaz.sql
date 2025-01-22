-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 22. 08:58
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
  `meret_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `vezeteknev`, `keresztnev`, `felhasznalonev`, `jelszo`, `szuletesi_datum`, `email_cim`, `telefonszam`, `lakcim`, `nem`, `meret_id`) VALUES
(9, 'Kapitor', 'Balázs', 'kbalazs', '$2b$10$CiZmsPvXSI0sbBs5wDd/U.xp3p.1QWeZmeh.hAfEMV8kKvDVzuZZe', '2005-06-04', 'kapitorb@gmail.com', '06701234567', '5', 'ferfi', NULL),
(10, 'teszt', '123', 'teszt', '$2b$10$a80lkjLgZEz9t0QPNOiTrOqZ7/NpFzPIudtZBuoGnQswdgT4YtV.C', '0006-07-08', 'teszt@gmail.com', '06201234567', '5', 'ferfi', NULL),
(11, 'Kapitor', 'Balázs', 'kbalazs1', '$2b$10$KmDW7Fqg/JibSDUz1HNWjuHx/azd9iyWCkovFwl71wJ89tDoeTo4i', '0006-07-08', 'teszt1@gmail.com', '06701234567', '5', 'ferfi', NULL),
(12, 'Kapitor', 'Balázs', 'kbalazs2', '$2b$10$KEG8hnxT5EjIuZXRCTGbj.g0jzLdsD/csMwgLTxd/l81TL27MyeCG', '0005-06-07', 'kapitorb1@gmail.com', '06701234567', '5', 'ferfi', NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ruhak`
--

CREATE TABLE `ruhak` (
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
-- A tábla adatainak kiíratása `ruhak`
--

INSERT INTO `ruhak` (`id`, `ar`, `meret`, `anyag`, `marka`, `szin`, `leiras`, `nem`, `kep_url`) VALUES
(1, 5000, 'M', 'Pamut', 'Nike', 'Kék', 'Kényelmes pamut póló', 'Férfi', './src/assets/polo1.jpg'),
(2, 6000, 'L', 'Pamut', 'Adidas', 'Zöld', 'Sportos pamut póló', 'Férfi', './src/assets/polo2.jpg'),
(3, 4500, 'S', 'Pamut', 'Puma', 'Fekete', 'Klasszikus pamut póló', 'Férfi', './src/assets/polo3.jpg'),
(4, 7000, 'M', 'Poliészter', 'Reebok', 'Fehér', 'Futó póló', 'Férfi', './src/assets/polo4.jpg'),
(5, 8000, 'XL', 'Pamut', 'Under Armour', 'Szürke', 'Kényelmes edző póló', 'Férfi', './src/assets/polo5.jpg'),
(6, 5500, 'M', 'Pamut', 'H&M', 'Kék', 'Divatos pamut póló', 'Női', './src/assets/polo6.jpg'),
(7, 6500, 'L', 'Pamut', 'Zara', 'Piros', 'Stílusos pamut póló', 'Női', './src/assets/polo7.jpg'),
(8, 4800, 'S', 'Pamut', 'Mango', 'Fehér', 'Kényelmes női póló', 'Női', './src/assets/polo8.jpg'),
(9, 7200, 'M', 'Poliészter', 'Nike', 'Fekete', 'Futó póló női', 'Női', './src/assets/polo9.jpg'),
(10, 7500, 'XL', 'Pamut', 'Adidas', 'Zöld', 'Sportos női póló', 'Női', './src/assets/polo10.jpg'),
(11, 5000, 'M', 'Pamut', 'Levi\'s', 'Kék', 'Klasszikus farmer póló', 'Férfi', './src/assets/polo11.jpg'),
(12, 6000, 'L', 'Pamut', 'Tommy Hilfiger', 'Piros', 'Elegáns pamut póló', 'Férfi', './src/assets/polo12.jpg'),
(13, 4500, 'S', 'Pamut', 'Calvin Klein', 'Szürke', 'Minimalista póló', 'Férfi', './src/assets/polo13.jpg'),
(14, 7000, 'M', 'Poliészter', 'New Balance', 'Fehér', 'Futó póló', 'Férfi', './src/assets/polo14.jpg'),
(15, 8000, 'XL', 'Pamut', 'H&M', 'Kék', 'Kényelmes edző póló', 'Női', './src/assets/polo15.jpg'),
(16, 5500, 'M', 'Pamut', 'Zara', 'Zöld', 'Divatos női póló', 'Női', './src/assets/polo16.jpg'),
(17, 6500, 'L', 'Pamut', 'Mango', 'Fekete', 'Stílusos női póló', 'Női', './src/assets/polo17.jpg'),
(18, 4800, 'S', 'Pamut', 'Nike', 'Fehér', 'Kényelmes női póló', 'Női', './src/assets/polo18.jpg'),
(19, 7200, 'M', 'Poliészter', 'Adidas', 'Piros', 'Futó póló női', 'Női', './src/assets/polo19.jpg'),
(20, 7500, 'XL', 'Pamut', 'Puma', 'Szürke', 'Sportos női póló', 'Női', './src/assets/polo20.jpg');

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
-- A tábla indexei `ruhak`
--
ALTER TABLE `ruhak`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `ruhak`
--
ALTER TABLE `ruhak`
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
  ADD CONSTRAINT `ruha_meretek_ibfk_1` FOREIGN KEY (`ruha_id`) REFERENCES `ruhak` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
