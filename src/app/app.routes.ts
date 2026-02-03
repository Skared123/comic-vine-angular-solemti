import { Routes } from '@angular/router';
import { HeroDetail } from './pages/hero-detail/hero-detail';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 's', component: HeroDetail },
];
