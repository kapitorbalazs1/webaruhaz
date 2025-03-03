import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  lathatoLablec: boolean = false;

  @HostListener('window:scroll', [])
  ellenorizGorgetest() {
    const felsoPozicio = window.pageYOffset || document.documentElement.scrollTop;
    const ablakMagassag = window.innerHeight;
    const dokumentumMagassag = document.documentElement.scrollHeight;

    this.lathatoLablec = felsoPozicio + ablakMagassag >= dokumentumMagassag - 5;
  }
}
