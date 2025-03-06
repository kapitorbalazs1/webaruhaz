import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-nadragok',
  templateUrl: './nadragok.component.html',
  styleUrls: ['./nadragok.component.css']
})
export class NadragokComponent implements OnInit {
  nadragokLista: any[] = [];
  szurtNadragokLista: any[] = [];
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
  ) {}

  ngOnInit(): void {
    this.beolvasNadragokat();
  }

  async beolvasNadragokat(): Promise<void> {
    this.betoltesFolyamatban = true;

    try {
      const adatok = await firstValueFrom(this.ruhaSzolgaltatas.termekeketLeker('nadragok'));

      if (adatok.Nadragok && Array.isArray(adatok.Nadragok)) {
        this.nadragokLista = adatok.Nadragok.map((nadrag: any) => ({
          ...nadrag,
          id: `${nadrag.id}_nadrag`,
          kep_url: nadrag.kep_url.replace('src/', '')
        }));

        this.szurtNadragokLista = [...this.nadragokLista];

        this.markak = [...new Set(this.nadragokLista.map(nadrag => nadrag.marka))];
        this.meretek = [...new Set(this.nadragokLista.map(nadrag => nadrag.meret))];
        this.anyagok = [...new Set(this.nadragokLista.map(nadrag => nadrag.anyag))];
        this.nemek = [...new Set(this.nadragokLista.map(nadrag => nadrag.nem))];
        this.szinek = [...new Set(this.nadragokLista.map(nadrag => nadrag.szin))];
        this.minAr = Math.min(...this.nadragokLista.map(nadrag => nadrag.ar));
        this.maxAr = Math.max(...this.nadragokLista.map(nadrag => nadrag.ar));
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
        this.szurtNadragokLista.sort((a, b) => a.marka.localeCompare(b.marka));
        break;
      case 'abcCsokkeno':
        this.szurtNadragokLista.sort((a, b) => b.marka.localeCompare(a.marka));
        break;
      case 'arNovekvo':
        this.szurtNadragokLista.sort((a, b) => a.ar - b.ar);
        break;
      case 'arCsokkeno':
        this.szurtNadragokLista.sort((a, b) => b.ar - a.ar);
        break;
      case 'meretNovekvo':
        this.szurtNadragokLista.sort((a, b) => a.meret.localeCompare(b.meret));
        break;
      case 'meretCsokkeno':
        this.szurtNadragokLista.sort((a, b) => b.meret.localeCompare(a.meret));
        break;
      case 'szinNovekvo':
        this.szurtNadragokLista.sort((a, b) => a.szin.localeCompare(b.szin));
        break;
      case 'szinCsokkeno':
        this.szurtNadragokLista.sort((a, b) => b.szin.localeCompare(a.szin));
        break;
      case 'alap':
      default:
        this.szurtNadragokLista = [...this.nadragokLista];
        break;
    }
  }

  szures(): void {
    this.szurtNadragokLista = this.nadragokLista.filter(nadrag => {
      const markaEgyezik = this.kivalasztottMarka ? nadrag.marka === this.kivalasztottMarka : true;
      const meretEgyezik = this.kivalasztottMeret ? nadrag.meret === this.kivalasztottMeret : true;
      const szinEgyezik = this.kivalasztottSzin ? nadrag.szin === this.kivalasztottSzin : true;
      const nemEgyezik = this.kivalasztottNem ? nadrag.nem === this.kivalasztottNem : true;
      const anyagEgyezik = this.kivalasztottAnyag ? nadrag.anyag === this.kivalasztottAnyag : true;
      const arEgyezik = nadrag.ar <= this.kivalasztottAr;

      return markaEgyezik && meretEgyezik && szinEgyezik && nemEgyezik && anyagEgyezik && arEgyezik;
    });
  }

  kosarhozAd(nadrag: any): void {
    if (this.bejelentkezve) {
      this.kosarSzolgaltatas.kosarhozAd(nadrag);
    } else {
      window.alert('Kérjük, jelentkezzen be a vásárláshoz!');
    }
  }

  get bejelentkezve(): boolean {
    return this.authSzolgaltatas.bejelentkezesiAllapot();
  }
}
