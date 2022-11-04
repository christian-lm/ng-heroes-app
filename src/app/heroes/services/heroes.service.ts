import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Heroe} from "../interfaces/heroe.interface";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private host: string = environment.host;

  constructor(private http: HttpClient) {
  }

  /**
   * Obtencion de los heroes por REST
   */
  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.host}/heroes`);
  }

  getHeroePorID(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.host}/heroes/${id}`);
  }

  getHeroesPorTermino(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.host}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.host}/heroes`, heroe)
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.host}/heroes/${heroe.id}`, heroe)
  }
}
