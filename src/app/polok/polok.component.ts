import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-polok',
  templateUrl: './polok.component.html',
  styleUrls: ['./polok.component.css']
})
export class PolokComponent implements OnInit {
  polokLista: any[] = [];
  szurtPolokLista: any[] = [];
  betoltesFolyamatban = false;

  kivalasztottMarka: string = '';
  kivalasztottMeret: string = '';
  kivalasztottAnyag: string = '';
  kivalasztottSzin: string = '';
  kivalasztottNem: string = '';
  kivalasztottAr: number = 0;
  minAr: number = 0;
  maxAr: number = 0;

  markak: string[] = [];
  meretek: string[] = [];
  anyagok: string[] = [];
  nemek: string[] = [];
  szinek: string[] = [];

  private idozitoId: any = null;

  kivalasztottRendezes: string = 'alap';

  constructor(
    private ruhaSzolgaltatas: ClothingService, 
    private kosarSzolgaltatas: CartService,
    private authSzolgaltatas: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.beolvasPolokat();
  }

  async beolvasPolokat(): Promise<void> {
    this.betoltesFolyamatban = true;

    try {
      const adatok = await firstValueFrom(this.ruhaSzolgaltatas.termekeketLeker('polok'));

      if (adatok.Polok && Array.isArray(adatok.Polok)) {
        this.polokLista = adatok.Polok.map((polo: any) => ({
          ...polo,
          id: `${polo.id}_polo`,
          kep_url: polo.kep_url.replace('src/', '')
        }));

        this.szurtPolokLista = [...this.polokLista];

        this.markak = [...new Set(this.polokLista.map(polo => polo.marka))];
        this.meretek = [...new Set(this.polokLista.map(polo => polo.meret))];
        this.anyagok = [...new Set(this.polokLista.map(polo => polo.anyag))];
        this.nemek = [...new Set(this.polokLista.map(polo => polo.nem))];
        this.szinek = [...new Set(this.polokLista.map(polo => polo.szin))];
        this.minAr = Math.min(...this.polokLista.map(polo => polo.ar));
        this.maxAr = Math.max(...this.polokLista.map(polo => polo.ar));
        this.kivalasztottAr = this.maxAr;
      } else {
        console.error('Nincsenek elérhető pólók:', adatok);
      }
    } catch (hiba) {
      console.error('Hiba történt a pólók lekérésekor:', hiba);
    } finally {
      this.betoltesFolyamatban = false;
    }
  }

  csokkentAr(): void {
    if (this.kivalasztottAr > this.minAr) {
      this.kivalasztottAr -= 1;
      this.szures();
    }
  }

  novelAr(): void {
    if (this.kivalasztottAr < this.maxAr) {
      this.kivalasztottAr += 1;
      this.szures();
    }
  }

  arCsokkenteseInditas(): void {
    this.idozitoId = setInterval(() => {
      this.csokkentAr();
    }, 100);
  }

  arNoveleseInditas(): void {
    this.idozitoId = setInterval(() => {
      this.novelAr();
    }, 100);
  }

  arValtoztatasLeallitas(): void {
    if (this.idozitoId) {
      clearInterval(this.idozitoId);
      this.idozitoId = null;
    }
  }

  rendezesAlapjan(): void {
    switch (this.kivalasztottRendezes) {
      case 'abcNovekvo':
        this.szurtPolokLista.sort((a, b) => a.marka.localeCompare(b.marka));
        break;
      case 'abcCsokkeno':
        this.szurtPolokLista.sort((a, b) => b.marka.localeCompare(a.marka));
        break;
      case 'arNovekvo':
        this.szurtPolokLista.sort((a, b) => a.ar - b.ar);
        break;
      case 'arCsokkeno':
        this.szurtPolokLista.sort((a, b) => b.ar - a.ar);
        break;
      case 'meretNovekvo':
        this.szurtPolokLista.sort((a, b) => a.meret.localeCompare(b.meret));
        break;
      case 'meretCsokkeno':
        this.szurtPolokLista.sort((a, b) => b.meret.localeCompare(a.meret));
        break;
      case 'szinNovekvo':
        this.szurtPolokLista.sort((a, b) => a.szin.localeCompare(b.szin));
        break;
      case 'szinCsokkeno':
        this.szurtPolokLista.sort((a, b) => b.szin.localeCompare(a.szin));
        break;
      case 'alap':
      default:
        this.szurtPolokLista = [...this.polokLista];
        break;
    }
  }

  szures(): void {
    this.szurtPolokLista = this.polokLista.filter(polo => {
      const markaEgyezik = this.kivalasztottMarka ? polo.marka === this.kivalasztottMarka : true;
      const meretEgyezik = this.kivalasztottMeret ? polo.meret === this.kivalasztottMeret : true;
      const szinEgyezik = this.kivalasztottSzin ? polo.szin === this.kivalasztottSzin : true;
      const nemEgyezik = this.kivalasztottNem ? polo.nem === this.kivalasztottNem : true;
      const anyagEgyezik = this.kivalasztottAnyag ? polo.anyag === this.kivalasztottAnyag : true;
      const arEgyezik = polo.ar <= this.kivalasztottAr;

      return markaEgyezik && meretEgyezik && szinEgyezik && nemEgyezik && anyagEgyezik && arEgyezik;
    });
  }

  kosarhozAd(polo: any): void {
    if (this.bejelentkezve) {
      try {
        this.kosarSzolgaltatas.kosarhozAd(polo);
        this.snackBar.open('Sikeresen hozzáadva a kosárhoz!', 'OK', {
          duration: 3000,
          verticalPosition: 'top'
        });
      } catch (error) {
        this.snackBar.open('Hiba történt a kosárhoz adáskor!', 'OK', {
          duration: 3000,
        });
        console.error('Error adding to cart:', error);
      }
    } else {
      this.snackBar.open('Kérjük, jelentkezzen be a vásárláshoz!', 'OK', {
        duration: 3000,
        verticalPosition: 'top'
      });
    }
  }

  get bejelentkezve(): boolean {
    return this.authSzolgaltatas.bejelentkezesiAllapot();
  }
}
