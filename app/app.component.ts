import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TitleService } from './title.service'; 
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private cimSzolgaltatas: TitleService) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const title = this.lekerCim(this.router.routerState.root);
      this.cimSzolgaltatas.beallitCim(title);
    });
  }

  kezdolap(): boolean {
    const jelenlegiUrl = this.router.url;
    return jelenlegiUrl === '/' || jelenlegiUrl === '/home';
  }

  private lekerCim(utvonal: ActivatedRoute): string {
    let cim = 'Főoldal';
    while (utvonal.firstChild) {
      utvonal = utvonal.firstChild;
      if (utvonal.snapshot.data['cim']) {
        cim = utvonal.snapshot.data['cim'];
      }
    }
    return cim;
  }
}