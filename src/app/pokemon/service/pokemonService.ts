// pokemon.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map } from 'rxjs';

// Servicio para consumo de la PokéAPI usando HttpClient
@Injectable({ providedIn: 'root' })
export class PokemonService {
  // Señales para estado (emulan comportamiento reactivo/rxResource)
  data = signal<any>(null);         // guarda la respuesta de la API
  loading = signal(false);          // estado de carga
  error = signal<string | null>(null); // posible error

  // URL base para la API
  public base = 'https://pokeapi.co/api/v2/pokemon';

  constructor(public http: HttpClient) {}

  // Método para obtener el listado con offset y limit (usa rx-like)
  fetchList(offset = 0, limit = 20) {
    // Indicamos que estamos cargando
    this.loading.set(true);
    this.error.set(null);

    // Hacemos la petición HTTP
    from(this.http.get(`${this.base}?offset=${offset}&limit=${limit}`).toPromise())
      .pipe(
        // Mapeo simple
        map((res) => res)
      )
      .subscribe({
        next: (res) => {
          // Guardamos la data y desactivamos loading
          this.data.set(res);
          this.loading.set(false);
        },
        error: (err) => {
          // Si falla, guardamos mensaje de error
          this.error.set('No se pudo obtener la lista de Pokémon');
          this.loading.set(false);
        }
      });
  }

  // Método para obtener detalle por id o por URL
  fetchDetailById(id: string | number) {
    this.loading.set(true);
    this.error.set(null);

    from(this.http.get(`${this.base}/${id}`).toPromise()).subscribe({
      next: (res) => {
        this.data.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo obtener detalle del Pokémon.');
        this.loading.set(false);
      }
    });
  }
}
