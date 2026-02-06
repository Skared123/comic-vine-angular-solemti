import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private baseUrl = environment.apiUrl;
  private heroesCache: any[] = [];

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<any[]> {
    if (this.heroesCache.length > 0) {
      return of(this.heroesCache);
    }

    const url = `${this.baseUrl}/characters`;

    return this.http.get<any>(url).pipe(
      map((res) => {
        const mappedHeroes = res.results.map((hero: any) => ({
          id: hero.id,
          name: hero.name,
          realName: hero.real_name || 'Desconocido',
          thumbnail:
            hero.image?.screen_large_url || hero.image?.original_url || 'assets/placeholder.png',
          comicsCount: hero.count_of_issue_appearances || 0,
        }));
        this.heroesCache = mappedHeroes;
        return mappedHeroes;
      }),
      catchError((err) => {
        return throwError(() => new Error('Error de conexión'));
      }),
    );
  }

  getHeroById(id: string): Observable<any> {
    const url = `${this.baseUrl}/character/${id}`;

    return this.http.get<any>(url).pipe(
      map((res) => res.results),
      catchError((err) => {
        return throwError(() => new Error('Error al obtener detalle del héroe'));
      }),
    );
  }
}
