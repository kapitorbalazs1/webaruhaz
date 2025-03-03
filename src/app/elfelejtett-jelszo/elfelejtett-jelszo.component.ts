import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-elfelejtett-jelszo',
  templateUrl: './elfelejtett-jelszo.component.html',
  styleUrls: ['./elfelejtett-jelszo.component.css']
})
export class ElfelejtettJelszoComponent {
  azonosito: string = '';
  biztonsagi_kerdes: string = '';
  biztonsagi_valasz: string = '';
  jelszo: string = '';
  jelszo_ismet: string = '';
  hibaUzenet: string | null = null;
  helyreallitasLathato: boolean = true;
  betoltesFolyamatban: boolean = false;
  tooltipMegjelenites = false;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  async jelszoHelyreallit() {
    this.hibaUzenet = null;

    if (!this.azonosito || !this.biztonsagi_kerdes || !this.biztonsagi_valasz) {
      this.hibaMegjelenit('A *-gal jelölt mezők kitöltése kötelező!');
      return;
    }

    this.betoltesFolyamatban = true;

    try {
      await firstValueFrom(this.http.post('http://localhost:3000/api/elfelejtett-jelszo', {
        azonosito: this.azonosito,
        biztonsagi_kerdes: this.biztonsagi_kerdes,
        biztonsagi_valasz: this.biztonsagi_valasz
      }));

      this.snackBar.open('Írd be az új jelszavadat!', 'OK', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
      this.helyreallitasLathato = false;
    } catch (error: any) {
      this.hibaUzenet = error.error?.uzenet || error.error?.message || 'Hiba történt a jelszó helyreállítása során.';
      this.hibaMegjelenit(this.hibaUzenet || 'Ismeretlen hiba történt.');
    } finally {
      this.betoltesFolyamatban = false;
    }
  }

  async jelszoModosit() {
    this.hibaUzenet = null;

    if (!this.jelszo || !this.jelszo_ismet) {
      this.hibaMegjelenit('A *-gal jelölt mezők kitöltése kötelező!');
      return;
    }

    if (this.jelszo !== this.jelszo_ismet) {
      this.hibaMegjelenit('A jelszavak nem egyeznek!');
      return;
    }

    const jelszoMinta = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    if (!jelszoMinta.test(this.jelszo)) {
      this.hibaMegjelenit('A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell kis- és nagybetűket, számot, és speciális karaktert (pl. @$!%*?&).');
      return;
    }

    this.betoltesFolyamatban = true;

    try {
      await firstValueFrom(this.http.post('http://localhost:3000/api/jelszo-modositas', {
        azonosito: this.azonosito,
        jelszo: this.jelszo
      }));

      this.snackBar.open('A jelszó sikeresen módosítva!', 'OK', { duration: 2500, verticalPosition: 'top', horizontalPosition: 'center' });
      this.jelszo = '';
      this.jelszo_ismet = '';
      this.router.navigate(['/bejelentkezes']);
    } catch (error: any) {
      this.hibaUzenet = error.error?.uzenet || error.error?.message || 'Hiba történt a jelszó módosítása során.';
      this.hibaMegjelenit(this.hibaUzenet || 'Ismeretlen hiba történt.');
    } finally {
      this.betoltesFolyamatban = false;
    }
  }

  hibaMegjelenit(uzenet: string) {
    this.hibaUzenet = uzenet;
    this.snackBar.open(uzenet, 'Bezárás', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
  }
}
