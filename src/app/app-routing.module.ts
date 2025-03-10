import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { ElfelejtettJelszoComponent } from './elfelejtett-jelszo/elfelejtett-jelszo.component';
import { PolokComponent } from './polok/polok.component';
import { PuloverekComponent } from './puloverek/puloverek.component';
import { IngekComponent } from './ingek/ingek.component';
import { KabatokComponent } from './kabatok/kabatok.component';
import { NadragokComponent } from './nadragok/nadragok.component';
import { AdomanyozasComponent } from './adomanyozas/adomanyozas.component';
import { RendelesReszletekComponent } from './rendeles-reszletek/rendeles-reszletek.component';
import { RendelesekComponent } from './rendelesek/rendelesek.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { cim: 'Főoldal' } },
  { path: 'regisztracio', component: RegisztracioComponent, data: { cim: 'Regisztráció' } },
  { path: 'bejelentkezes', component: BejelentkezesComponent, data: { cim: 'Bejelentkezés' } },
  { path: 'elfelejtett-jelszo', component: ElfelejtettJelszoComponent, data: { cim: 'Elfelejtett jelszó' } },
  { path: 'polok', component: PolokComponent, data: { cim: 'Pólók' } },
  { path: 'pulcsik', component: PuloverekComponent, data: { cim: 'Pulóverek' } },
  { path: 'ingek', component: IngekComponent, data: { cim: 'Ingek' } },
  { path: 'kabatok', component: KabatokComponent, data: { cim: 'Kabátok' } },
  { path: 'nadragok', component: NadragokComponent, data: { cim: 'Nadrágok' } },
  { path: 'adomanyozas', component: AdomanyozasComponent, data: { cim: 'Adományozás' } },
  { path: 'rendeles-reszletek', component: RendelesReszletekComponent, data: { cim: 'Rendelés részletek' } },
  { path: 'rendelesek', component: RendelesekComponent, data: { cim: 'Rendelések' } },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
