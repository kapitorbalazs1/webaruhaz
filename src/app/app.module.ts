import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { SlideshowComponent } from './slideshow/slideshow.component';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    SlideshowComponent,
    NavbarComponent,
    FooterComponent,
    RegisztracioComponent,
    BejelentkezesComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],

  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
