import { Component } from '@angular/core';

@Component({
  selector: 'app-adomanyozas',
  templateUrl: './adomanyozas.component.html',
  styleUrls: ['./adomanyozas.component.css']
})
export class AdomanyozasComponent {
  kuponMegjelenites: boolean = false;
  kuponKod: string = '';
  kedvezmeny: number = 0;
  urlapElkuldve: boolean = false;
  hibaUzenet: string = '';
  masolGombSzoveg: string = 'Másolás';
  tooltipMegjelenites: boolean = false;

  constructor() {
    const mentettKupon = localStorage.getItem('kuponKod');
    if (mentettKupon) {
      const kuponAdatok = JSON.parse(mentettKupon);
      this.kuponKod = kuponAdatok.kod;
      this.kedvezmeny = kuponAdatok.kedvezmeny;
      this.kuponMegjelenites = true;
    }
  }

  onSubmit(osszeg: number, email: string): void {
    this.urlapElkuldve = true;

    if (!osszeg || !email) {
      this.hibaUzenet = 'A *-gal jelölt mezők kitöltése kötelező';
      return;
    }

    if (osszeg < 100) {
      this.hibaUzenet = 'Az összegnek legalább 100 HUF-nak kell lennie!';
      return;
    }

    if (!this.emailHitelesites(email)) {
      this.hibaUzenet = 'Kérjük, érvényes e-mail címet adjon meg!';
      return;
    }

    console.log(`Adomány ${osszeg} HUF érkezett ${email} címről`);

    // Kedvezmény kiszámítása a beírt összeg alapján
    if (osszeg >= 10000) {
      this.kedvezmeny = 25;
    } else if (osszeg >= 1000) {
      this.kedvezmeny = 10;
    } else {
      this.kedvezmeny = 1;
    }

    this.kuponKod = this.kuponKodGeneralas();
    this.kuponMegjelenites = true;
    this.hibaUzenet = '';

    const kuponAdatok = {
      kod: this.kuponKod,
      kedvezmeny: this.kedvezmeny
    };
    localStorage.setItem('kuponKod', JSON.stringify(kuponAdatok));
  }

  public kuponKodGeneralas(): string {
    const karakterek = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let kupon = '';
    for (let i = 0; i < 8; i++) {
      kupon += karakterek.charAt(Math.floor(Math.random() * karakterek.length));
    }
    return kupon;
  }

  public emailHitelesites(email: string): boolean {
    const emailEllenorzes = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailEllenorzes.test(email);
  }

  vagolapraMasolas(kupon: string): void {
    navigator.clipboard.writeText(kupon).then(() => {
      console.log('Kuponkód másolva a vágólapra!');
      this.masolGombSzoveg = 'Másolva';
      setTimeout(() => {
        this.masolGombSzoveg = 'Másolás';
      }, 2000);
    }).catch(err => {
      console.error('Hiba történt a kuponkód másolása közben:', err);
    });
  }
}
