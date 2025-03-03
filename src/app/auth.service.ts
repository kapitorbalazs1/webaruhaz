import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly tarolasiKulcs = 'bejelentkezve';
  private readonly felhasznalonevKulcs = 'felhasznalonev';

  constructor() {
    this.bejelentkezve = this.bejelentkezesiAllapot();
  }

  public bejelentkezesiAllapot(): boolean {
    return localStorage.getItem(this.tarolasiKulcs) === 'true';
  }

  public set bejelentkezve(ertek: boolean) {
    localStorage.setItem(this.tarolasiKulcs, String(ertek));
  }

  bejelentkezett(): boolean {
    return this.bejelentkezesiAllapot();
  }

  bejelentkezes(felhasznalonev: string): void {
    this.bejelentkezve = true;
    localStorage.setItem(this.felhasznalonevKulcs, felhasznalonev);
  }

  kijelentkezes(): void {
    this.bejelentkezve = false;
    localStorage.removeItem(this.felhasznalonevKulcs);
  }

  get felhasznalonev(): string | null {
    const felhasznalonev = localStorage.getItem(this.felhasznalonevKulcs);
    return felhasznalonev;
  }
}
