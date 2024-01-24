import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interfaces/Pokemon';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  // Constructor del servicio, inyecta la dependencia HttpClient
  constructor(private http: HttpClient) { }

  private pokemons: Pokemon[]=[]

  // URL base para las solicitudes HTTP
  private url = "http://localhost:3000/pokemons"

 // Metodo para obtener la lista de pokemons 
  getPokemons(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(`${this.url}?_limit=12`);
  }

   // Metodo para obtener un pokemon específico por su ID
  getPokemon(id:Number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.url}/${id}`);
  }

 // Método para buscar pokemons por nombre
 //realiza una solicitud HTTP para obtener la lista completa y luego filtra
  searchPokemon(name: string): Pokemon[]{
    this.getPokemons().subscribe((pokemonsList)=> {
      this.pokemons=pokemonsList;
    })
    return this.pokemons.filter(pokemon => pokemon.name.english.toLowerCase().includes(name.toLowerCase()));
  }

   // Metodo para agregar un nuevo pokemon
  addPokemon(pokemon: Omit<Pokemon,'id'>): Observable<Pokemon>{
    return this.http.post<Pokemon>(this.url,pokemon)
  }

  // Metodo para editar un pokemon existente por su ID
  editPokemon(id: number, pokemon: Omit<Pokemon,'id'>):Observable<Pokemon>{
    return this.http.put<Pokemon>(`${this.url}/${id}`,pokemon)
  }

  // Metodo para eliminar un pokemon por su ID
  deletePokemon(id: number):Observable<Object>{
    return this.http.delete<Object>(`${this.url}/${id}`)
  }


}