import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, OnDestroy {
  jelenlegiDia = 0;
  diak = [
    { kep: '../../assets/akciók 1.jpeg' },
    { kep: '../../assets/akciók 2.jpeg' },
    { kep: '../../assets/akciók 3.jpeg' }
  ];
  private idozitoId: any = null;
  private lapozasiIdo = 3000;
  private autoLapozasEngedelyezve = true;

  ngOnInit(): void {
    this.automatikusLapozasIndit();
  }

  ngOnDestroy(): void {
    this.automatikusLapozasLeallit();
  }

  private automatikusLapozasIndit(): void {
    if (this.autoLapozasEngedelyezve && this.idozitoId === null) {
      this.idozitoId = setInterval(() => {
        this.kovetkezoDia(true);
      }, this.lapozasiIdo);
    }
  }

  private automatikusLapozasLeallit(): void {
    if (this.idozitoId !== null) {
      clearInterval(this.idozitoId);
      this.idozitoId = null;
    }
  }

  kovetkezoDia(automatikus: boolean = false): void {
    if (this.diak.length === 0) {
      console.warn('Nincsenek diák betöltve!');
      return;
    }
    
    this.jelenlegiDia++;
    if (this.jelenlegiDia >= this.diak.length) {
      this.jelenlegiDia = 0;
    }
    
    if (!automatikus) {
      this.automatikusLapozasLeallit();
      this.automatikusLapozasIndit();
    }
  }

  elozoDia(): void {
    if (this.diak.length === 0) {
      console.warn('Nincsenek diák betöltve!');
      return;
    }
    
    this.jelenlegiDia--;
    if (this.jelenlegiDia < 0) {
      this.jelenlegiDia = this.diak.length - 1;
    }
    
    this.automatikusLapozasLeallit();
    this.automatikusLapozasIndit();
  }

  lapozasiSebessegModositas(ujIdo: number): void {
    if (ujIdo > 500) {
      this.lapozasiIdo = ujIdo;
      this.automatikusLapozasLeallit();
      this.automatikusLapozasIndit();
    }
  }
}
