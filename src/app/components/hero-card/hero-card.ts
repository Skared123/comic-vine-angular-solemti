import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hero-card.html',
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;
}
