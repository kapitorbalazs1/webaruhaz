Szent István Katolikus Technikum és Gimnázium
![image](https://github.com/user-attachments/assets/fb6b942b-a5ee-404b-8478-f111a048c3f5)

Projekt címe: Ruházati Webáruház

## Projekt csapat tagjai 
- Fridrik István
- Kapitor Balázs  

## Projekt leírása
A „DivatPalota” egy modern, felhasználóbarát ruházati webáruház, amely a vásárlók egyéni stílusának és igényeinek kiszolgálására fókuszál. Célja egy letisztult, könnyen kezelhető platform létrehozása, amely mérettáblázattal és szűrési lehetőségekkel segíti a megfelelő ruhadarabok kiválasztását, csökkentve a visszaküldési arányt. A rendszer regisztrációhoz kötött vásárlást kínál, de a böngészés nem regisztrált felhasználók számára is elérhető.

## Rendszerkövetelmények
## Minimális gépigény
- Processzor: 1,5 GHz, kétmagos (pl. Intel Core i3 vagy hasonló)
- Memória: 4 GB RAM
- Tárhely: 500 MB szabad hely
- Internetkapcsolat: 5 Mbps
- Operációs rendszer: Windows 10 (64-bit), macOS 10.14, Ubuntu 18.04 vagy újabb
- Böngésző: Google Chrome 90, Firefox 88, Edge 90, Safari 14 vagy újabb
- Kijelző: 1024x768 felbontás

## Ajánlott gépigény
- Processzor: 2,5 GHz, négymagos (pl. Intel Core i5/i7 vagy AMD Ryzen)
- Memória: 8 GB RAM
- Tárhely: 1 GB szabad hely
- Internetkapcsolat: 20 Mbps
- Operációs rendszer: Windows 11 (64-bit), macOS 12, Ubuntu 20.04 vagy újabb
- Böngésző: Google Chrome 100, Firefox 95, Edge 100, Safari 15 vagy újabb
- Kijelző: 1920x1080 (Full HD)

## Fejlesztéshez használt szoftverek
- Node.js: 18.x (LTS) - Backend futtatási környezet
- Angular CLI: 16.2.x - Frontend fejlesztés és build
- XAMPP: 8.2.x (MySQL 8.0.x, Apache 2.4.x) - Adatbázis és szerver
- Visual Studio Code: 1.85.x - Kódszerkesztő
- Git: 2.43.x - Verziókezelés
- MariaDB: 10.4.32 - Adatbázis-kezelő
- phpMyAdmin: 5.2.1 - Adatbázis adminisztráció
- Jest: 29.x - Backend tesztelés
- Jasmine: 4.6.x és Karma: 6.4.x - Frontend tesztelés

## Üzembehelyezés menete fejlesztéshez
1. Szükséges szoftverek telepítése:
   - Telepítse a Node.js-t (18.x) és az npm-et: [nodejs.org](https://nodejs.org)
   - Telepítse az Angular CLI-t globálisan: `npm install -g @angular/cli@16.2.x`
   - Telepítse a XAMPP-ot: [apachefriends.org](https://www.apachefriends.org)
   - Telepítse a Git-et (opcionális): [git-scm.com](https://git-scm.com)

2. Forráskód beszerzése:
   - Klónozza a repository-kat:
     `git clone https://github.com/kapitorbalazs1/webaruhaz.git -b webaruhaz_frontend`
     `git clone https://github.com/kapitorbalazs1/webaruhaz.git -b webaruhaz_backend`
   - Vagy töltse le ZIP formátumban és bontsa ki külön mappákba.

3. Adatbázis beállítása:
   - Indítsa el a XAMPP-ot, aktiválja az Apache és MySQL modulokat.
   - Nyissa meg a `http://localhost/phpmyadmin` oldalt.
   - Hozzon létre egy új adatbázist: `webaruhaz`.
   - Importálja a `webaruhaz.sql` fájlt az "Import" fülön keresztül.

4. Backend telepítése:
   - Lépjen a backend mappába:
     `cd webaruhaz_backend`
   - Telepítse a függőségeket:
     `npm install`
   - Ellenőrizze/állítsa be a `.env` fájlt:
     `DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=""
     DB_NAME=webaruhaz
     PORT=3000`
   - Indítsa el a szervert:
     `npm start`

5. Frontend telepítése:
   - Lépjen a frontend mappába:
     `cd webaruhaz_frontend`
   - Telepítse a függőségeket:
     `npm install`
   - Indítsa el az Angular szervert:
     `ng serve`

6. Ellenőrzés:
   - Nyissa meg a böngészőt, és navigáljon a `http://localhost:4200` címre.
   - Ha a főoldal betölt, a telepítés sikeres.

Megjegyzés: Ha a portok (3000 vagy 4200) foglaltak, módosítsa a `.env` fájlban a `PORT`-ot, illetve használja az `ng serve --port <új_port>` parancsot. Éles környezetben buildelje a frontendet (`ng build --prod`) és másolja a `dist/` mappát egy webszerverre.
