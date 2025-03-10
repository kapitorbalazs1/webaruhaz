import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { ElfelejtettJelszoComponent } from './elfelejtett-jelszo/elfelejtett-jelszo.component';
import { PolokComponent } from './polok/polok.component';
import { PuloverekComponent } from './puloverek/puloverek.component';
import { IngekComponent } from './ingek/ingek.component';
import { KabatokComponent } from './kabatok/kabatok.component';
import { NadragokComponent } from './nadragok/nadragok.component';

import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { ClothingService } from './clothing.service';
import { TitleService } from './title.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RendelesReszletekComponent } from './rendeles-reszletek/rendeles-reszletek.component';
import { AdomanyozasComponent } from './adomanyozas/adomanyozas.component';
import { RendelesekComponent } from './rendelesek/rendelesek.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SlideshowComponent,
    NavbarComponent,
    FooterComponent,
    RegisztracioComponent,
    BejelentkezesComponent,
    ElfelejtettJelszoComponent,
    PolokComponent,
    PuloverekComponent,
    IngekComponent,
    KabatokComponent,
    NadragokComponent,
    RendelesReszletekComponent,
    AdomanyozasComponent,
    RendelesekComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, CartService, ClothingService, TitleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
