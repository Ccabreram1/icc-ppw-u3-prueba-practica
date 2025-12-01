import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../pokemon/service/pokemonService';
import { FormUtils } from '../../shere/Utils/formUtils';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './HomePage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  // Señales para offset y limit (paginación)
  offset = signal(20); // el enunciado da offset inicial 20
  limit = signal(20);

  // Inyectamos el servicio y router
  constructor(public pokemonService: PokemonService, private router: Router) {
    // Efecto que ejecuta la carga cada vez que offset o limit cambian
    effect(() => {
      const off = this.offset();
      const lim = this.limit();
      // Llamada al servicio para actualizar datos
      this.pokemonService.fetchList(off, lim);
    });
  }

  // Ir a siguiente página
  nextPage() {
    // Calculamos nuevo offset sumando limit
    this.offset.set(this.offset() + this.limit());
  }

  // Ir a página anterior
  prevPage() {
    // Restamos limit, sin bajar de 0
    const newOffset = Math.max(0, this.offset() - this.limit());
    this.offset.set(newOffset);
  }

  // Navegar al detalle (extraer id desde la URL que trae results o usando el nombre)
  goToDetail(urlOrName: string) {
    // Si recibimos URL, extraemos id con regex, si no usamos nombre (la ruta permite id o name)
    const match = urlOrName.match(/\/pokemon\/(\d+)\//);
    const id = match ? match[1] : urlOrName;
    this.router.navigate(['/pokemon', id]);
  }
}