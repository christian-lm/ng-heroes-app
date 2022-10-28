import {Component, Input} from '@angular/core';
import {Heroe} from "../../interfaces/heroe.interface";

@Component({
  selector: 'app-heroes-tarjeta',
  templateUrl: './heroes-tarjeta.component.html'
})
export class HeroesTarjetaComponent {

  @Input() heroe!: Heroe;

}
