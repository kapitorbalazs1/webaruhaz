import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-regisztracio',
  templateUrl: './regisztracio.component.html',
  styleUrls: ['./regisztracio.component.css']
})
export class RegisztracioComponent {
  user = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    birthDate: '',
    email: '',
    phone: '',
    address: '',
    gender: ''
  };

  errorMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Kérjük, töltse ki az összes mezőt.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.errorMessage = 'Az email formátuma nem megfelelő!';
      return;
    }

    this.errorMessage = null;

    this.http.post('http://localhost:3000/api/register', this.user)
      .subscribe({
        next: () => {
          this.router.navigate(['/bejelentkezes']);
        },
        error: (err) => {
          if (err.status === 409) {
            this.errorMessage = 'A felhasználó már létezik. Kérjük, próbálja meg egy másik felhasználónévvel vagy email címmel.';
          } else if (err.status === 400) {
            this.errorMessage = 'Kérjük, ellenőrizze a megadott adatokat.';
          } else if (err.status === 500) {
            this.errorMessage = 'A szerver hibát észlelt. Kérjük, próbálja újra később.';
          } else {
            this.errorMessage = 'A regisztráció sikertelen. Kérjük, próbálja újra.';
          }
        }
      }
    );
  }
}
