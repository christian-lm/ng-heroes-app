import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Heroe} from "../interfaces/heroe.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) {
  }

  /**
   * Obtencion de los heroes por REST
   */
  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>('http://localhost:3000/heroes');
  }
}
