import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  kosarTartalom: any[] = [];
  kosarLenyitva: boolean = false;

  constructor(
    private authSzolgaltatas: AuthService,
    private router: Router,
    private kosarSzolgaltatas: CartService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.kosarSzolgaltatas.kosarTartalom$.subscribe(termekek => {
      this.kosarTartalom = termekek;
      this.cdr.detectChanges();
    });

    // Router események esetén frissítés
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.kosarTartalom = this.kosarSzolgaltatas.kosarTartalom(); // Kosár tartalmának frissítése
      this.cdr.detectChanges();
    });
  }

  get bejelentkezve(): boolean {
    return this.authSzolgaltatas.bejelentkezett();
  }

  kijelentkezes(): void {
    this.authSzolgaltatas.kijelentkezes();
    this.snackBar.open('Sikeres kijelentkezés!', 'Bezárás', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
    this.router.navigate(['/fooldal']);
  }

  kosarMegnyitas(): void {
    this.kosarLenyitva = !this.kosarLenyitva;
    this.cdr.detectChanges();
  }

  osszAr(): number {
    return this.kosarTartalom.reduce((osszesen, termek) => osszesen + (termek.ar * termek.mennyiseg), 0);
  }

  osszMennyiseg(): number {
    return this.kosarTartalom.reduce((osszesen, termek) => osszesen + termek.mennyiseg, 0);
  }

  eltavolitTermek(termek: any): void {
    this.kosarSzolgaltatas.eltavolitKosarbol(termek);
  }

  novelMennyiseg(termek: any): void {
    this.kosarSzolgaltatas.novelMennyiseg(termek);
  }

  csokkentMennyiseg(termek: any): void {
    this.kosarSzolgaltatas.csokkentMennyiseg(termek);
  }

  kosarUritese(): void {
    this.kosarSzolgaltatas.uritKosarat();
  }

  folytatVasarlast(): void {
    this.router.navigate(['/rendeles-reszletek']);
  }
}
