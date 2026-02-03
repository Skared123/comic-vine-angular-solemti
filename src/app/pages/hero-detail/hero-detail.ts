import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core'; // 1. Añade ChangeDetectorRef
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeroService } from '../../services/hero';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.css',
})
export class HeroDetail implements OnInit {
  hero: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private cdr: ChangeDetectorRef, // 2. Inyectalo aquí
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.getHeroDetails(id);
      }
    }
  }

  getHeroDetails(id: string): void {
    this.loading = true;
    this.heroService.getHeroById(id).subscribe({
      next: (res) => {
        // 3. Forzamos la actualización
        this.hero = res;
        this.loading = false;
        this.cdr.detectChanges(); // <--- ESTO ES LA CLAVE
        console.log('Detalle del héroe cargado');
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
