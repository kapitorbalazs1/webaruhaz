import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent {
  felhasznalo = {
    vezeteknev: '',
    keresztnev: '',
    felhasznalonev: '',
    jelszo: '',
    jelszo_ismet: '',
    szuletesi_datum: '',
    email_cim: '',
    telefonszam: '',
    lakcim: '',
    nem: '',
    biztonsagi_kerdes: '',
    biztonsagi_valasz: ''
  };

  hibaUzenet: string | null = null;
  betoltesFolyamatban = false;
  tooltipMegjelenites = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit(form: NgForm) {
    this.hibaUzenet = null;

    // Mezők kitöltése kötelező
    if (form.invalid) {
      this.hibaMegjelenit('A *-gal jelölt mezők kitöltése kötelező!');
      return;
    }

    // Jelszó ellenőrzése
    const jelszoMinta = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!jelszoMinta.test(this.felhasznalo.jelszo)) {
      this.hibaMegjelenit('A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell kis- és nagybetűket, számot, és speciális karaktert (pl. @$!%*?&).');
      return;
    }

    // E-mail formátum ellenőrzése
    const emailMinta = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailMinta.test(this.felhasznalo.email_cim)) {
      this.hibaMegjelenit('Az email formátuma nem megfelelő!');
      return;
    }

    // Jelszavak egyeznek-e?
    if (this.felhasznalo.jelszo !== this.felhasznalo.jelszo_ismet) {
      this.hibaMegjelenit('A jelszavak nem egyeznek!');
      return;
    }

    this.betoltesFolyamatban = true;

    try {
      // Regisztráció elküldése a szerverre
      await firstValueFrom(
        this.http.post('http://localhost:3000/api/regisztracio', this.felhasznalo)
      );

      // Üzenet megjelenítése
      this.snackBar.open('Sikeres regisztráció! Most már bejelentkezhet.', 'OK', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
      this.router.navigate(['/bejelentkezes']);
    } catch (error: any) {
      let uzenet = '';

      // Hibakezelés
      if (error.status === 409) {
        uzenet = 'Ez a felhasználónév vagy email már foglalt.';
      } else if (error.status === 400) {
        uzenet = 'Kérjük, ellenőrizze az adatokat!';
      } else if (error.status === 500) {
        uzenet = 'A szerver hiba történt. Próbálja újra később.';
      } else {
        uzenet = 'A regisztráció sikertelen. Próbálja újra!';
      }

      this.hibaMegjelenit(uzenet);
    } finally {
      this.betoltesFolyamatban = false;
    }
  }

  // Hibaüzenet
  hibaMegjelenit(uzenet: string) {
    this.hibaUzenet = uzenet;
    this.snackBar.open(uzenet, 'Bezárás', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
