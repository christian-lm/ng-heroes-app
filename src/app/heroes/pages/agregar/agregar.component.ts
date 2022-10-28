import {Component, OnInit} from '@angular/core';
import {Heroe, Publisher} from "../../interfaces/heroe.interface";

@Component({
  selector: 'app-add',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC',
      desc: Publisher.DCComics
    },
    {
      id: 'Marvel',
      desc: Publisher.MarvelComics
    }
  ];

  heroe: Heroe =
    {
      alter_ego: "",
      characters: "",
      first_appearance: "",
      publisher: Publisher.MarvelComics,
      superhero: ""
    }

  constructor() {
  }

  ngOnInit(): void {
  }

}
