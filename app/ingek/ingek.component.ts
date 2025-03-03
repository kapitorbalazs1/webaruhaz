import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-ingek',
  templateUrl: './ingek.component.html',
  styleUrls: ['./ingek.component.css']
})
export class IngekComponent implements OnInit {
  ingekLista: any[] = [];
  szurtIngekLista: any[] = [];
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
    this.beolvasIngeket();
  }

  async beolvasIngeket(): Promise<void> {
    this.betoltesFolyamatban = true;

    try {
      const adatok = await firstValueFrom(this.ruhaSzolgaltatas.termekeketLeker('ingek'));

      if (adatok.Ingek && Array.isArray(adatok.Ingek)) {
        this.ingekLista = adatok.Ingek.map((ing: any) => ({
          ...ing,
          id: `${ing.id}_pulcsi`,
          kep_url: ing.kep_url.replace('src/', '')
        }));

        this.szurtIngekLista = [...this.ingekLista];

        this.markak = [...new Set(this.ingekLista.map(ing => ing.marka))];
        this.meretek = [...new Set(this.ingekLista.map(ing => ing.meret))];
        this.anyagok = [...new Set(this.ingekLista.map(ing => ing.anyag))];
        this.nemek = [...new Set(this.ingekLista.map(ing => ing.nem))];
        this.szinek = [...new Set(this.ingekLista.map(ing => ing.szin))];
        this.minAr = Math.min(...this.ingekLista.map(ing => ing.ar));
        this.maxAr = Math.max(...this.ingekLista.map(ing => ing.ar));
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
        this.szurtIngekLista.sort((a, b) => a.marka.localeCompare(b.marka));
        break;
      case 'abcCsokkeno':
        this.szurtIngekLista.sort((a, b) => b.marka.localeCompare(a.marka));
        break;
      case 'arNovekvo':
        this.szurtIngekLista.sort((a, b) => a.ar - b.ar);
        break;
      case 'arCsokkeno':
        this.szurtIngekLista.sort((a, b) => b.ar - a.ar);
        break;
      case 'meretNovekvo':
        this.szurtIngekLista.sort((a, b) => a.meret.localeCompare(b.meret));
        break;
      case 'meretCsokkeno':
        this.szurtIngekLista.sort((a, b) => b.meret.localeCompare(a.meret));
        break;
      case 'szinNovekvo':
        this.szurtIngekLista.sort((a, b) => a.szin.localeCompare(b.szin));
        break;
      case 'szinCsokkeno':
        this.szurtIngekLista.sort((a, b) => b.szin.localeCompare(a.szin));
        break;
      case 'alap':
      default:
        this.szurtIngekLista = [...this.ingekLista];
        break;
    }
  }

  szures(): void {
    this.szurtIngekLista = this.ingekLista.filter(ing => {
      const markaEgyezik = this.kivalasztottMarka ? ing.marka === this.kivalasztottMarka : true;
      const meretEgyezik = this.kivalasztottMeret ? ing.meret === this.kivalasztottMeret : true;
      const szinEgyezik = this.kivalasztottSzin ? ing.szin === this.kivalasztottSzin : true;
      const nemEgyezik = this.kivalasztottNem ? ing.nem === this.kivalasztottNem : true;
      const anyagEgyezik = this.kivalasztottAnyag ? ing.anyag === this.kivalasztottAnyag : true;
      const arEgyezik = ing.ar <= this.kivalasztottAr;

      return markaEgyezik && meretEgyezik && szinEgyezik && nemEgyezik && anyagEgyezik && arEgyezik;
    });
  }

  kosarhozAd(ing: any): void {
    if (this.bejelentkezve) {
      this.kosarSzolgaltatas.kosarhozAd(ing);
    } else {
      window.alert('Kérjük, jelentkezzen be a vásárláshoz!');
    }
  }

  get bejelentkezve(): boolean {
    return this.authSzolgaltatas.bejelentkezesiAllapot();
  }
}
