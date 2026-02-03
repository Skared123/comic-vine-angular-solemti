import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
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
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadHeroes();
    }
  }

  loadHeroes(): void {
    this.loading = true;
    this.heroService.getHeroes().subscribe({
      next: (res) => {
        this.heroes = [...res];
        this.loading = false;
        this.cdr.detectChanges();
        console.log('Héroes en pantalla:', this.heroes.length);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
