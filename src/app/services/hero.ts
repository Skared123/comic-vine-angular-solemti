import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private baseUrl = environment.apiUrl;
  private key = environment.apiKey;
  private heroesCache: any[] = [];

  constructor(private http: HttpClient) {}

  // 1. Obtener lista de héroes
  getHeroes(): Observable<any[]> {
    if (this.heroesCache.length > 0) {
      return of(this.heroesCache);
    }

    const params = new HttpParams()
      .set('api_key', this.key)
      .set('format', 'json')
      .set('limit', '20');

    const url = `${this.baseUrl}/characters/`;
    console.log('Llamando a lista:', url);

    return this.http.get<any>(url, { params }).pipe(
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
        console.error('Error en servicio (getHeroes):', err);
        return throwError(() => new Error('Error de conexión'));
      }),
    );
  }

  // 2. OBTENER UN HÉROE POR ID (Esta es la que te faltaba y daba error en la terminal)
  getHeroById(id: string): Observable<any> {
    const params = new HttpParams().set('api_key', this.key).set('format', 'json');

    // Comic Vine usa el prefijo 4005- para personajes
    const url = `${this.baseUrl}/character/4005-${id}/`;
    console.log('Llamando a detalle:', url);

    return this.http.get<any>(url, { params }).pipe(
      map((res) => res.results),
      catchError((err) => {
        console.error('Error en servicio (getHeroById):', err);
        return throwError(() => new Error('Error al obtener detalle del héroe'));
      }),
    );
  }
}
