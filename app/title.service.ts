import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(private cimSzolgaltatas: Title) {}

  beallitCim(ujCim: string) {
    this.cimSzolgaltatas.setTitle(ujCim);
  }

  lekerCim(): string {
    return this.cimSzolgaltatas.getTitle();
  }
}
