import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rendelesek',
  templateUrl: './rendelesek.component.html',
  styleUrls: ['./rendelesek.component.css']
})
export class RendelesekComponent implements OnInit {
  rendelesek: any[] = [];
  hibaUzenet: string | null = null;
  felhasznalonev: string | null = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.felhasznalonev = localStorage.getItem('felhasznalonev');
    if (this.felhasznalonev) {
      this.rendelesekBetoltese(); // Rendelések betöltése, ha a felhasználó be van jelentkezve
    } else {
      this.hibaUzenet = 'Nincsen bejelentkezett felhasználó!';
    }
  }

  // Rendelések betöltése a szerverről
  rendelesekBetoltese(): void {
    firstValueFrom(this.http.get<any[]>('http://localhost:3000/api/rendelesek').pipe(
      tap(rendelesek => {
        console.log('Rendelések:', rendelesek);
        console.log('Felhasználónév:', this.felhasznalonev);
    
        // Rendelések szűrése a bejelentkezett felhasználóhoz
        this.rendelesek = rendelesek.filter(rendeles => 
          rendeles.felhasznalonev && 
          rendeles.felhasznalonev.trim() === this.felhasznalonev?.trim()
        );
        console.log('Filtered Rendelések:', this.rendelesek);
        
        if (this.rendelesek.length === 0) {
          this.hibaUzenet = 'Nincs rendelése a felhasználónak!';
        }
      }),
      catchError(hiba => {
        console.error('API hiba:', hiba);
        this.hibaUzenet = 'Hiba a rendelések betöltésekor.';
        return of([]);
      })
    )).catch(hiba => {
      console.error('Hiba történt a rendelés betöltésekor:', hiba);
      this.hibaUzenet = 'Hiba a rendelés betöltésekor.';
    });
  }

  // PDF fájl megnyitása
  megnyitPDF(rendeles: any): void {
    if (!rendeles.pdfUrl) {
      this.hibaUzenet = 'Nincs elérhető PDF fájl!';
      this.openSnackBar(this.hibaUzenet, 'Bezárás');
      return;
    }

    const fajlUtvonal = rendeles.pdfUrl;
    this.http.post('http://localhost:3000/api/pdf-megnyitas', { fajlUtvonal }).subscribe(
      (valasz: any) => {
        console.log('PDF megnyitva:', valasz);
        this.openSnackBar('PDF megnyitva!', 'Bezárás');
      },
      hiba => {
        console.error('Hiba a PDF megnyitásakor:', hiba);
        this.hibaUzenet = 'Hiba a PDF megnyitásakor.';
        this.openSnackBar(this.hibaUzenet, 'Bezárás');
      }
    );
  }

  // Értesítés megjelenítése
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
