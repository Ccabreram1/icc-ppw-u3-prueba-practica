import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemonService';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail-page',
  imports: [CommonModule],
  templateUrl: './pokemon-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailPage  implements OnInit { 
    // Inyectamos servicio, ruta y router
  constructor(
    public pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Leemos el parámetro :id y solicitamos detalle
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonService.fetchDetailById(id);
    }
  }

  // Método para regresar a /home
  back() {
    this.router.navigate(['/home']);
  }
}
