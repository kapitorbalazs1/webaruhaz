import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showFooter: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Log the values for debugging
    console.log(`Scroll Top: ${scrollTop}, Window Height: ${windowHeight}, Document Height: ${documentHeight}`);

    // Check if the user has scrolled to the bottom of the page with a slight buffer
    if (scrollTop + windowHeight >= documentHeight - 5) {
      this.showFooter = true;
      console.log('Footer should be shown');
    } else {
      this.showFooter = false;
      console.log('Footer should be hidden');
    }
  }
}