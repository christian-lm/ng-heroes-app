import {Component, OnInit} from '@angular/core';
import {Heroe, Publisher} from "../../interfaces/heroe.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-add',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5%;
      }`
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: Publisher.DCComics
    },
    {
      id: 'Marvel Comics',
      desc: Publisher.MarvelComics
    }
  ];

  heroe: Heroe =
    {
      alter_ego: "",
      characters: "",
      first_appearance: "",
      publisher: Publisher.MarvelComics,
      superhero: "",
      alt_img: ""
    }

  constructor(private heroeService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit(): void {

    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.heroeService.getHeroePorID(id))
        )
        .subscribe(heroe => this.heroe = heroe)
    } else {
      return;
    }
  }

  // Metodo guardar
  guardar() {

    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    // Si hay ID, editamos
    if (this.heroe.id != null) {
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(resp => {
          console.log('Respuesta: ', resp);
        })
    } else {
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id])
        })
    }
  }
}
