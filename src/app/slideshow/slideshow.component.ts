import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slides = [
    { image: 'assets/akciók 1.jpeg' },
    { image: 'assets/akciók 2.jpeg' },
    { image: 'assets/akciók 3.jpeg' }
  ];
  intervalId: any;

  ngOnInit() {
    this.startAutoScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  startAutoScroll() {
    this.intervalId = setInterval(() => this.nextSlide(), 3000);
  }

  stopAutoScroll() {
    clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
