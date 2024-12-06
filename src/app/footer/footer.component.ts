import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  showFooter: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if the user has scrolled to the bottom of the page with a slight buffer
    if (scrollTop + windowHeight >= documentHeight - 5) {
      this.showFooter = true;
    } else {
      this.showFooter = false;
    }
  }
}
