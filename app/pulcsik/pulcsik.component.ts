import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pulcsik',
  templateUrl: './pulcsik.component.html',
  styleUrls: ['./pulcsik.component.css']
})
export class PulcsikComponent implements OnInit {
  pulcsikLista: any[] = [];
  szurtPulcsikLista: any[] = [];
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
    this.beolvasPulcsikat();
  }

  async beolvasPulcsikat(): Promise<void> {
    this.betoltesFolyamatban = true;

    try {
      const adatok = await firstValueFrom(this.ruhaSzolgaltatas.termekeketLeker('pulcsik'));

      if (adatok.Pulcsik && Array.isArray(adatok.Pulcsik)) {
        this.pulcsikLista = adatok.Pulcsik.map((pulcsi: any) => ({
          ...pulcsi,
          id: `${pulcsi.id}_pulcsi`,
          kep_url: pulcsi.kep_url.replace('src/', '')
        }));

        this.szurtPulcsikLista = [...this.pulcsikLista];

        this.markak = [...new Set(this.pulcsikLista.map(pulcsi => pulcsi.marka))];
        this.meretek = [...new Set(this.pulcsikLista.map(pulcsi => pulcsi.meret))];
        this.anyagok = [...new Set(this.pulcsikLista.map(pulcsi => pulcsi.anyag))];
        this.nemek = [...new Set(this.pulcsikLista.map(pulcsi => pulcsi.nem))];
        this.szinek = [...new Set(this.pulcsikLista.map(pulcsi => pulcsi.szin))];
        this.minAr = Math.min(...this.pulcsikLista.map(pulcsi => pulcsi.ar));
        this.maxAr = Math.max(...this.pulcsikLista.map(pulcsi => pulcsi.ar));
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
        this.szurtPulcsikLista.sort((a, b) => a.marka.localeCompare(b.marka));
        break;
      case 'abcCsokkeno':
        this.szurtPulcsikLista.sort((a, b) => b.marka.localeCompare(a.marka));
        break;
      case 'arNovekvo':
        this.szurtPulcsikLista.sort((a, b) => a.ar - b.ar);
        break;
      case 'arCsokkeno':
        this.szurtPulcsikLista.sort((a, b) => b.ar - a.ar);
        break;
      case 'meretNovekvo':
        this.szurtPulcsikLista.sort((a, b) => a.meret.localeCompare(b.meret));
        break;
      case 'meretCsokkeno':
        this.szurtPulcsikLista.sort((a, b) => b.meret.localeCompare(a.meret));
        break;
      case 'szinNovekvo':
        this.szurtPulcsikLista.sort((a, b) => a.szin.localeCompare(b.szin));
        break;
      case 'szinCsokkeno':
        this.szurtPulcsikLista.sort((a, b) => b.szin.localeCompare(a.szin));
        break;
      case 'alap':
      default:
        this.szurtPulcsikLista = [...this.pulcsikLista];
        break;
    }
  }

  szures(): void {
    this.szurtPulcsikLista = this.pulcsikLista.filter(pulcsi => {
      const markaEgyezik = this.kivalasztottMarka ? pulcsi.marka === this.kivalasztottMarka : true;
      const meretEgyezik = this.kivalasztottMeret ? pulcsi.meret === this.kivalasztottMeret : true;
      const szinEgyezik = this.kivalasztottSzin ? pulcsi.szin === this.kivalasztottSzin : true;
      const nemEgyezik = this.kivalasztottNem ? pulcsi.nem === this.kivalasztottNem : true;
      const anyagEgyezik = this.kivalasztottAnyag ? pulcsi.anyag === this.kivalasztottAnyag : true;
      const arEgyezik = pulcsi.ar <= this.kivalasztottAr;

      return markaEgyezik && meretEgyezik && szinEgyezik && nemEgyezik && anyagEgyezik && arEgyezik;
    });
  }

  kosarhozAd(pulcsi: any): void {
    if (this.bejelentkezve) {
      this.kosarSzolgaltatas.kosarhozAd(pulcsi);
    } else {
      window.alert('Kérjük, jelentkezzen be a vásárláshoz!');
    }
  }

  get bejelentkezve(): boolean {
    return this.authSzolgaltatas.bejelentkezesiAllapot();
  }
}
