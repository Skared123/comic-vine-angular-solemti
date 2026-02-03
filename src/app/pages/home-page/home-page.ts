import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroService } from '../../services/hero';
import { HeroCardComponent } from '../../components/hero-card/hero-card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeroCardComponent, RouterModule],
  templateUrl: './home-page.html',
})
export class HomePageComponent implements OnInit {
  heroes: any[] = [];
  loading: boolean = true;

  constructor(
    private heroService: HeroService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.heroService.getHeroes().subscribe({
        next: (res) => {
          this.heroes = res;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
    }
  }
}
