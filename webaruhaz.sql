-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Jan 08. 13:53
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
  `nem` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `ruhak`
--
ALTER TABLE `ruhak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
