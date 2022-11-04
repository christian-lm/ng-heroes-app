import {Component, OnInit} from '@angular/core';
import {Heroe, Publisher} from "../../interfaces/heroe.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmarComponent} from "../../components/confirmar/confirmar.component";

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
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
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
          this.mostrarSnackbar("Registro actualizado");
        })
    } else {
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackbar("Registro creado");
        })
    }
  }

  // Metodo borrar
  borrar() {

    const dialogRef = this.dialog.open(ConfirmarComponent, {
      width: '500px',
      data: {...this.heroe}
    });

    dialogRef.afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.heroeService.deleteHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
            })
        }
      })
  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, "Cerrar", {
      duration: 2500
    });
  }
}
