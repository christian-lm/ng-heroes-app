import {Component} from '@angular/core';
import {Heroe} from "../../interfaces/heroe.interface";
import {HeroesService} from "../../services/heroes.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent {

  termino: string = "";
  heroes!: Heroe[];
  heroeSeleccionado!: Heroe;

  constructor(private heroeService: HeroesService) {
  }

  buscando() {
    this.heroeService.getHeroesPorTermino(this.termino)
      .subscribe(heroes => {
        this.heroes = heroes;
      });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;

    if (value) {
      const heroe: Heroe = value;
      this.termino = heroe.superhero;

      this.heroeService.getHeroePorID(heroe.id!)
        .subscribe(heroe => {
          this.heroeSeleccionado = heroe;
        })
    }
  }
}
