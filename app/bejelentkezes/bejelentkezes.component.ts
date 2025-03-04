import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent {
  azonosito = '';  
  jelszo = '';  
  hibaUzenet: string | null = null;  
  betoltesFolyamatban = false;  
  showTooltip = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit() {
    this.hibaUzenet = null;

    if (!this.azonosito || !this.jelszo) {
      this.hibaMegjelenit('A *-gal jelölt mezők kitöltése kötelező!');
      return;
    }

    this.betoltesFolyamatban = true;

    try {
      const valasz = await firstValueFrom(
        this.http.post<{ token: string, felhasznalo: { felhasznalonev: string } }>('http://localhost:3000/api/bejelentkezes', {
          azonosito: this.azonosito,
          jelszo: this.jelszo
        })
      );

      console.log('Bejelentkezés válasz:', valasz);
      this.authService.bejelentkezes(valasz.felhasznalo.felhasznalonev);
      this.snackBar.open('Sikeres bejelentkezés! Üdv újra! 🎉', 'OK', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
      this.router.navigate(['/home']);
    } catch (error: any) {
      let uzenet = '';

      if (error.status === 401) {
        uzenet = 'Rossz jelszó! Próbáld újra.';
      } else if (error.status === 404) {
        uzenet = 'Nem található ilyen felhasználó.';
      } else {
        uzenet = 'Hiba történt, kérlek próbáld újra egy kicsit később.';
      }

      this.hibaMegjelenit(uzenet);
    } finally {
      this.betoltesFolyamatban = false;
    }
  }

  hibaMegjelenit(uzenet: string) {
    this.hibaUzenet = uzenet;
    this.snackBar.open(uzenet, 'Bezárás', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
  }
}
