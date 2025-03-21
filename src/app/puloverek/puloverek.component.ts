import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../clothing.service';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-puloverek',
  templateUrl: './puloverek.component.html',
  styleUrls: ['./puloverek.component.css']
})
export class PuloverekComponent implements OnInit {
  puloverekLista: any[] = [];
  szurtPuloverekLista: any[] = [];
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
    this.beolvasPuloverekat();
  }

  async beolvasPuloverekat(): Promise<void> {
    this.betoltesFolyamatban = true;

    try {
      const adatok = await firstValueFrom(this.ruhaSzolgaltatas.termekeketLeker('puloverek'));

      if (adatok.Puloverek && Array.isArray(adatok.Puloverek)) {
        this.puloverekLista = adatok.Puloverek.map((pulover: any) => ({
          ...pulover,
          id: `${pulover.id}_pulover`,
          kep_url: pulover.kep_url.replace('src/', '')
        }));

        this.szurtPuloverekLista = [...this.puloverekLista];

        this.markak = [...new Set(this.puloverekLista.map(pulover => pulover.marka))];
        this.meretek = [...new Set(this.puloverekLista.map(pulover => pulover.meret))];
        this.anyagok = [...new Set(this.puloverekLista.map(pulover => pulover.anyag))];
        this.nemek = [...new Set(this.puloverekLista.map(pulover => pulover.nem))];
        this.szinek = [...new Set(this.puloverekLista.map(pulover => pulover.szin))];
        this.minAr = Math.min(...this.puloverekLista.map(pulover => pulover.ar));
        this.maxAr = Math.max(...this.puloverekLista.map(pulover => pulover.ar));
        this.kivalasztottAr = this.maxAr;
      } else {
        console.error('Nincsenek elérhető pulóverek:', adatok);
      }
    } catch (hiba) {
      console.error('Hiba történt a pulóverek lekérésekor:', hiba);
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
        this.szurtPuloverekLista.sort((a, b) => a.marka.localeCompare(b.marka));
        break;
      case 'abcCsokkeno':
        this.szurtPuloverekLista.sort((a, b) => b.marka.localeCompare(a.marka));
        break;
      case 'arNovekvo':
        this.szurtPuloverekLista.sort((a, b) => a.ar - b.ar);
        break;
      case 'arCsokkeno':
        this.szurtPuloverekLista.sort((a, b) => b.ar - a.ar);
        break;
      case 'meretNovekvo':
        this.szurtPuloverekLista.sort((a, b) => a.meret.localeCompare(b.meret));
        break;
      case 'meretCsokkeno':
        this.szurtPuloverekLista.sort((a, b) => b.meret.localeCompare(a.meret));
        break;
      case 'szinNovekvo':
        this.szurtPuloverekLista.sort((a, b) => a.szin.localeCompare(b.szin));
        break;
      case 'szinCsokkeno':
        this.szurtPuloverekLista.sort((a, b) => b.szin.localeCompare(a.szin));
        break;
      case 'alap':
      default:
        this.szurtPuloverekLista = [...this.puloverekLista];
        break;
    }
  }

  szures(): void {
    this.szurtPuloverekLista = this.puloverekLista.filter(pulover => {
      const markaEgyezik = this.kivalasztottMarka ? pulover.marka === this.kivalasztottMarka : true;
      const meretEgyezik = this.kivalasztottMeret ? pulover.meret === this.kivalasztottMeret : true;
      const szinEgyezik = this.kivalasztottSzin ? pulover.szin === this.kivalasztottSzin : true;
      const nemEgyezik = this.kivalasztottNem ? pulover.nem === this.kivalasztottNem : true;
      const anyagEgyezik = this.kivalasztottAnyag ? pulover.anyag === this.kivalasztottAnyag : true;
      const arEgyezik = pulover.ar <= this.kivalasztottAr;

      return markaEgyezik && meretEgyezik && szinEgyezik && nemEgyezik && anyagEgyezik && arEgyezik;
    });
  }

  kosarhozAd(pulover: any): void {
    if (this.bejelentkezve) {
      try {
        this.kosarSzolgaltatas.kosarhozAd(pulover);
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
