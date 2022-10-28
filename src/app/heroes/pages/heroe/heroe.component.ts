import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeroesService} from "../../services/heroes.service";
import {Heroe} from "../../interfaces/heroe.interface";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class HeroeComponent implements OnInit {

  id: string = "";
  heroe!: Heroe;

  constructor(private route: ActivatedRoute, private heroeService: HeroesService, private router: Router) {
  }

  ngOnInit(): void {
    let urlID = this.route.snapshot.paramMap.get('id');

    if (urlID != null) {
      this.id = urlID;
    }

    this.heroeService.getHeroePorID(this.id)
      .subscribe(heroe => {
        this.heroe = heroe;
      })
  }

  regresar() {
    this.router.navigate(["/heroes/listado"]);
  }

}
