import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kabatok',
  templateUrl: './kabatok.component.html',
  styleUrls: ['./kabatok.component.css']
})
export class KabatokComponent implements OnInit {
  kabatokLista: any[] = [];
  szurtKabatokLista: any[] = [];
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
    this.beolvasKabatokat();
  }

  async beolvasKabatokat(): Promise<void> {
    this.betoltesFolyamatban = true;

    try {
      const adatok = await firstValueFrom(this.ruhaSzolgaltatas.termekeketLeker('kabatok'));

      if (adatok.Kabatok && Array.isArray(adatok.Kabatok)) {
        this.kabatokLista = adatok.Kabatok.map((kabat: any) => ({
          ...kabat,
          id: `${kabat.id}_kabat`,
          kep_url: kabat.kep_url.replace('src/', '')
        }));

        this.szurtKabatokLista = [...this.kabatokLista];

        this.markak = [...new Set(this.kabatokLista.map(kabat => kabat.marka))];
        this.meretek = [...new Set(this.kabatokLista.map(kabat => kabat.meret))];
        this.anyagok = [...new Set(this.kabatokLista.map(kabat => kabat.anyag))];
        this.nemek = [...new Set(this.kabatokLista.map(kabat => kabat.nem))];
        this.szinek = [...new Set(this.kabatokLista.map(kabat => kabat.szin))];
        this.minAr = Math.min(...this.kabatokLista.map(kabat => kabat.ar));
        this.maxAr = Math.max(...this.kabatokLista.map(kabat => kabat.ar));
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
        this.szurtKabatokLista.sort((a, b) => a.marka.localeCompare(b.marka));
        break;
      case 'abcCsokkeno':
        this.szurtKabatokLista.sort((a, b) => b.marka.localeCompare(a.marka));
        break;
      case 'arNovekvo':
        this.szurtKabatokLista.sort((a, b) => a.ar - b.ar);
        break;
      case 'arCsokkeno':
        this.szurtKabatokLista.sort((a, b) => b.ar - a.ar);
        break;
      case 'meretNovekvo':
        this.szurtKabatokLista.sort((a, b) => a.meret.localeCompare(b.meret));
        break;
      case 'meretCsokkeno':
        this.szurtKabatokLista.sort((a, b) => b.meret.localeCompare(a.meret));
        break;
      case 'szinNovekvo':
        this.szurtKabatokLista.sort((a, b) => a.szin.localeCompare(b.szin));
        break;
      case 'szinCsokkeno':
        this.szurtKabatokLista.sort((a, b) => b.szin.localeCompare(a.szin));
        break;
      case 'alap':
      default:
        this.szurtKabatokLista = [...this.kabatokLista];
        break;
    }
  }

  szures(): void {
    this.szurtKabatokLista = this.kabatokLista.filter(kabat => {
      const markaEgyezik = this.kivalasztottMarka ? kabat.marka === this.kivalasztottMarka : true;
      const meretEgyezik = this.kivalasztottMeret ? kabat.meret === this.kivalasztottMeret : true;
      const szinEgyezik = this.kivalasztottSzin ? kabat.szin === this.kivalasztottSzin : true;
      const nemEgyezik = this.kivalasztottNem ? kabat.nem === this.kivalasztottNem : true;
      const anyagEgyezik = this.kivalasztottAnyag ? kabat.anyag === this.kivalasztottAnyag : true;
      const arEgyezik = kabat.ar <= this.kivalasztottAr;

      return markaEgyezik && meretEgyezik && szinEgyezik && nemEgyezik && anyagEgyezik && arEgyezik;
    });
  }

  kosarhozAd(kabat: any): void {
    if (this.bejelentkezve) {
      try {
        this.kosarSzolgaltatas.kosarhozAd(kabat);
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
