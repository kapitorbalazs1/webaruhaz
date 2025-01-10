import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bejelentkezes',
  templateUrl: './bejelentkezes.component.html',
  styleUrls: ['./bejelentkezes.component.css']
})
export class BejelentkezesComponent {
  username: string = '';
  password: string = '';
  usernameError: string = '';
  passwordError: string = '';
  generalError: string | null = null;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  onSubmit() {
    this.usernameError = '';
    this.passwordError = '';
    this.generalError = null;

    if (!this.username && !this.password) {
      this.generalError = 'Kérjük, töltse ki az összes mezőt.';
      return;
    }

    this.http.post('http://localhost:3000/api/login', {
      username: this.username,
      password: this.password
    })
    .subscribe(
      () => {
        this.authService.login();
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error logging in:', error);
        if (error.status === 401) {
          this.passwordError = 'Helytelen jelszó!';
        } else if (error.status === 404) {
          this.usernameError = 'Felhasználónév nem található!';
        } else {
          this.generalError = 'Váratlan hiba történt. Kérjük, próbálja újra később.';
        }
      }
    );
  }
}
