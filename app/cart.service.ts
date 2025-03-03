import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public kosarTartalomSubject = new BehaviorSubject<any[]>(this.kosarTartalom());
  kosarTartalom$ = this.kosarTartalomSubject.asObservable();

  constructor() {}

  /**
   * Betölti a kosár tartalmát a localStorage-ból. Ha nincs adat vagy hiba van, üres tömböt ad vissza.
   */
  public kosarTartalom(): any[] {
    try {
      const taroltElemek = localStorage.getItem('kosarTartalom');
      if (!taroltElemek) {
        return [];
      }
      const szetvalaszt = JSON.parse(taroltElemek);
      if (!Array.isArray(szetvalaszt)) {
        console.warn('[CartService] Hibás kosáradatok, törlés...');
        localStorage.removeItem('kosarTartalom');
        return [];
      }
      return szetvalaszt;
    } catch (error) {
      console.error('[CartService] JSON parse hiba, törlés:', error);
      localStorage.removeItem('kosarTartalom');
      return [];
    }
  }

  /**
   * Frissíti a kosár tartalmát localStorage-ban és értesíti az előfizetőket.
   */
  public frissitKosarTartalmat(kosarElemek: any[]): void {
    try {
      localStorage.setItem('kosarTartalom', JSON.stringify(kosarElemek));
      this.kosarTartalomSubject.next(kosarElemek);
    } catch (error) {
      console.error('[CartService] Kosár frissítése sikertelen:', error);
    }
  }

  /**
   * Megkeresi egy termék indexét a kosárban egyedi kulcsok alapján (nem JSON.stringify()).
   */
  public keresTermekIndex(kosarElemek: any[], termek: any): number {
    return kosarElemek.findIndex(elem => 
      elem.id === termek.id && 
      this.variaciokEgyeznek(elem, termek) // Az egész termék objektumot adja át az összehasonlításhoz
    );
  }

  /**
   * Termékvariációk egyedi összehasonlítása (méret, szín stb.).
   */
  public variaciokEgyeznek(elem: any, termek: any): boolean {
    return (
      elem.meret === termek.meret &&
      elem.szin === termek.szin
    );
  }

  /**
   * Hozzáad egy terméket a kosárhoz. Ha már létezik ugyanaz a variáció, növeli a mennyiséget.
   */
  kosarhozAd(termek: any): void {
    if (!termek || !termek.id) {
      console.warn('[CartService] Érvénytelen termék:', termek);
      return;
    }

    const kosarElemek = this.kosarTartalom();
    const index = this.keresTermekIndex(kosarElemek, termek);

    if (index !== -1) {
      kosarElemek[index].mennyiseg += 1;
    } else {
      kosarElemek.push({ ...termek, mennyiseg: 1 });
    }

    this.frissitKosarTartalmat(kosarElemek);
  }

  /**
   * Eltávolít egy terméket teljesen a kosárból.
   */
  eltavolitKosarbol(termek: any): void {
    const kosarElemek = this.kosarTartalom();
    const ujKosar = kosarElemek.filter(elem => 
      elem.id !== termek.id || !this.variaciokEgyeznek(elem, termek)
    );
  
    if (ujKosar.length === kosarElemek.length) {
      console.warn('[CartService] Termék nem található:', termek);
    }
  
    this.frissitKosarTartalmat(ujKosar);
  }

  /**
   * Növeli egy adott termék mennyiségét.
   */
  novelMennyiseg(termek: any): void {
    const kosarElemek = this.kosarTartalom();
    const index = this.keresTermekIndex(kosarElemek, termek);

    if (index !== -1) {
      kosarElemek[index].mennyiseg += 1;
      this.frissitKosarTartalmat(kosarElemek);
    } else {
      console.warn('[CartService] Termék nem található a növeléshez:', termek);
    }
  }

  /**
   * Csökkenti egy adott termék mennyiségét, ha lecsökken 1-re, eltávolítja.
   */
  csokkentMennyiseg(termek: any): void {
    const kosarElemek = this.kosarTartalom();
    const index = this.keresTermekIndex(kosarElemek, termek);

    if (index !== -1) {
      if (kosarElemek[index].mennyiseg > 1) {
        kosarElemek[index].mennyiseg -= 1;
      } else {
        console.log('[CartService] Termék törölve:', termek);
        kosarElemek.splice(index, 1);
      }
      this.frissitKosarTartalmat(kosarElemek);
    } else {
      console.warn('[CartService] Termék nem található a csökkentéshez:', termek);
    }
  }

  /**
   * Kiüríti a kosarat.
   */
  uritKosarat(): void {
    console.log('[CartService] Kosár teljesen kiürítve.');
    localStorage.removeItem('kosarTartalom'); 
    this.frissitKosarTartalmat([]);
  }
}