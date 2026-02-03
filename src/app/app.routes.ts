import { Routes } from '@angular/router';
import { HeroDetail } from './pages/hero-detail/hero-detail';
import { HomePageComponent } from './pages/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'hero/:id', component: HeroDetail },
];
