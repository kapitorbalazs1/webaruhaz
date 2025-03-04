import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom, catchError, tap } from 'rxjs';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-rendeles-reszletek',
  templateUrl: './rendeles-reszletek.component.html',
  styleUrls: ['./rendeles-reszletek.component.css']
})
export class RendelesReszletekComponent {
  kosarTartalom: any[] = [];
  felhasznalonev: string | null = null;
  osszesen: number = 0;
  pdfUrl: string | null = null;
  urlapElkuldve: boolean = false;
  hibaUzenet: string | null = null;
  utolsoRendeles: any = null;

  vasarloAdatok: any = {
    nev: '',
    szallitasiCim: '',
    lakcim: '',
    telefon: '',
    email: ''
  };

  szallitasiDij: number = 1500;
  ingyenesSzallitasLimit: number = 20000;
  kiszallitoCeg: string = 'GLS'; // Alapértelmezett kiszállító cég

  fizetesiMod: string = 'előre utalás';
  utanvetFizetesiMod: string = 'készpénz';

  // Kuponkód szekció
  kuponKod: string = '';
  kuponHiba: string | null = null;
  kedvezmenyAlkalmazva: boolean = false;
  kedvezmeny: number = 0;
  ujOsszeg: number = 0;

  // Új tulajdonságok a számításokhoz
  nettoOsszeg: number = 0;
  afa: number = 0;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.kosarTartalom = this.cartService.kosarTartalom();
    this.felhasznalonev = this.authService.felhasznalonev;
    this.vegosszegSzamitas();
  }

  vegosszegSzamitas(): void {
    this.nettoOsszeg = this.kosarTartalom.reduce((total, elem) => total + elem.ar * elem.mennyiseg, 0);
    this.afa = Math.round(this.nettoOsszeg * 0.27);
    const bruttoOsszeg = this.nettoOsszeg + this.afa;

    // Szállítási díj kiszámítása
    this.szallitasiDij = bruttoOsszeg >= this.ingyenesSzallitasLimit ? 0 : 1500;

    const utanvetDij = this.fizetesiMod === 'utánvét' ? 1000 : 0;

    // Végösszeg kiszámítása kuponkód nélkül
    const vegosszegKuponNelkul = bruttoOsszeg + this.szallitasiDij + utanvetDij;

    // Eredeti ár eltárolása, hogy később használhassuk
    const eredetiAr = vegosszegKuponNelkul;

    // Kedvezmény alkalmazása, ha van ilyen érték
    if (this.kedvezmenyAlkalmazva) {
      const kedvezmenyOsszeg = Math.round(eredetiAr * (this.kedvezmeny / 100));
      this.ujOsszeg = eredetiAr - kedvezmenyOsszeg; 
    } else {
      this.ujOsszeg = eredetiAr;
    }

    // Értékek kerekítése
    this.osszesen = Math.round(eredetiAr);
    this.kedvezmenyAlkalmazva = this.kedvezmeny > 0;
  }

  onSubmit(): void {
    this.urlapElkuldve = true;
    this.hibaUzenet = null;
  
    this.letoltPDF(); // PDF generálásához szükséges metódus hívása
    this.openSnackBar('Rendelés sikeresen elküldve!', 'Bezárás');
  }

  letoltPDF(): void {
    if (!this.rendelesHitelesitese()) return;

    const rendelesAdatok = this.rendelesAdatokElokeszit();

    firstValueFrom(
      this.http.post<{ fajlUtvonal: string }>('http://localhost:3000/api/pdf-generalas', rendelesAdatok).pipe(
        tap(valasz => {
          console.log('PDF sikeresen létrehozva:', valasz.fajlUtvonal);
          this.pdfUrl = `http://localhost:3000${valasz.fajlUtvonal}`;
          this.openSnackBar('PDF sikeresen létrehozva!', 'Bezárás');
        }),
        catchError(error => {
          console.error('Hiba történt a PDF létrehozása közben:', error);
          this.hibaUzenet = 'Hiba történt a PDF létrehozása közben.';
          this.openSnackBar(this.hibaUzenet, 'Bezárás');
          return [];
        })
      )
    );

    localStorage.removeItem('kuponKod');
    localStorage.removeItem('kosarTartalom');
  }

  private rendelesHitelesitese(): boolean {
    if (!this.vasarloAdatok.nev || !this.vasarloAdatok.szallitasiCim || !this.vasarloAdatok.lakcim || 
        !this.vasarloAdatok.telefon || !this.vasarloAdatok.email) {
      this.hibaUzenet = 'A *-gal jelölt mezők kitöltése kötelező!';
      this.openSnackBar(this.hibaUzenet, 'Bezárás');
      return false;
    }

    const emailemailEllenorzes = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailemailEllenorzes.test(this.vasarloAdatok.email)) {
      this.hibaUzenet = 'Az email formátuma nem megfelelő!';
      this.openSnackBar(this.hibaUzenet, 'Bezárás');
      return false;
    }

    if (!this.felhasznalonev) {
      this.hibaUzenet = 'Felhasználónév nem található. Kérjük, jelentkezzen be.';
      this.openSnackBar(this.hibaUzenet, 'Bezárás');
      return false;
    }

    const jelenlegiRendeles = this.rendelesAdatokElokeszit();
    if (_.isEqual(jelenlegiRendeles, this.utolsoRendeles)) {
      this.hibaUzenet = 'Ez a rendelés már el lett küldve!';
      this.openSnackBar(this.hibaUzenet, 'Bezárás');
      return false;
    }

    this.utolsoRendeles = _.cloneDeep(jelenlegiRendeles);
    return true;
  }

  private rendelesAdatokElokeszit() {
    const kuponAdatok = localStorage.getItem('kuponKod');
    const kuponKod = kuponAdatok ? JSON.parse(kuponAdatok) : null;

    return {
      elemek: this.kosarTartalom,
      felhasznalonev: this.felhasznalonev,
      osszesen: this.osszesen,
      vasarloAdatok: this.vasarloAdatok,
      szallitasiDij: this.szallitasiDij,
      fizetesiMod: this.fizetesiMod,
      utanvetFizetesiMod: this.utanvetFizetesiMod,
      kuponKod: kuponKod
    };
  }

  megnyitPDF(): void {
    if (!this.pdfUrl) {
      this.openSnackBar('Nincs elérhető PDF.', 'Bezárás');
      return;
    }

    // PDF fájlnév
    const fajlUtvonal = this.pdfUrl.split('/').pop();

    firstValueFrom(
      this.http.post<{ message: string }>('http://localhost:3000/api/pdf-megnyitas', { fajlUtvonal }).pipe(
        tap(valasz => {
          this.openSnackBar('PDF sikeresen megnyitva!', 'Bezárás');
        }),
        catchError(error => {
          console.error('Hiba történt a PDF megnyitása közben:', error);
          this.openSnackBar('Hiba történt a PDF megnyitása közben.', 'Bezárás');
          return [];
        })
      )
    );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  fizetesiModValtas(): void {
    if (this.fizetesiMod !== 'utánvét') {
      this.utanvetFizetesiMod = 'készpénz';
    }
    this.vegosszegSzamitas(); // Újraszámolja az összeget, amikor a fizetési mód változik

    if (this.kedvezmenyAlkalmazva) {
      this.kuponAlkalmazasa(this.kuponKod);
    }
  }

  kuponAlkalmazasa(kod: string): void {
    this.kuponHiba = null; // Reset error message

    const kuponAdat = localStorage.getItem('kuponKod');
    if (kuponAdat) {
        try {
          const { kod: mentettKod, kedvezmeny: mentettKedvezmeny } = JSON.parse(kuponAdat);

          // Kuponkód ellenőrzése
          if (kod === mentettKod) {
            this.kedvezmeny = mentettKedvezmeny;
            this.kedvezmenyAlkalmazva = true;
            this.vegosszegSzamitas();
            return;
          }
      } catch (error) {
        console.error('Hiba történt a kuponkód feldolgozásakor:', error);
        this.kuponHiba = 'Hibás kuponkód formátum!';
        this.kedvezmenyAlkalmazva = false;
        return;
      }
    }

    // Ha a kuponkód érvénytelen
    this.kuponHiba = 'Érvénytelen kuponkód!';
    this.kedvezmenyAlkalmazva = false;
  }

  beillesztes(event: ClipboardEvent): void {
    const vagolapAdatok = event.clipboardData;
    if (vagolapAdatok) {
      const beillesztettAdat = vagolapAdatok.getData('szoveg');
      setTimeout(() => {
        this.kuponKod = beillesztettAdat; 
      }, 0);
    }
  }

  beillesztesGombraKattint(): void {
    navigator.clipboard.readText().then(szoveg => {
      this.kuponKod = szoveg;
    }).catch(err => {
      console.error('Hiba történt a vágólap olvasása közben:', err);
    });
  }
}
