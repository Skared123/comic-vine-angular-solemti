import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private baseUrl = environment.apiUrl;
  private key = environment.apiKey;

  private heroesCache: any[] = [];

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<any[]> {
    // Si ya tenemos héroes, los devolvemos de inmediato sin ir a la API
    if (this.heroesCache.length > 0) {
      return of(this.heroesCache);
    }

    const url = `${this.baseUrl}characters/?api_key=${this.key}&format=json&limit=20`;
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
      catchError(this.handleError),
    );
  }

  private handleError(error: any) {
    console.error('Error detectado en la petición:', error);
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.status === 0) {
      errorMessage = 'No hay conexión con el servidor (posible error de CORS)';
    } else if (error.status === 401) {
      errorMessage = 'API Key inválida';
    }

    return throwError(() => new Error(errorMessage));
  }
}
