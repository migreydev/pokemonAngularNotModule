import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Pokemon } from '../interfaces/Pokemon';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listar-pokemon',
  standalone: true,
  imports: [],
  templateUrl: './listar-pokemon.component.html'
})
export class ListarPokemonComponent implements OnInit{

  pokemons: Pokemon[] = [];

  //Variable que recibe el nombre del pokemon del buscador
  @Input('search') name:string="";


  constructor(private pokemonService : PokemonService, private router: Router, private route: ActivatedRoute) {}

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Verifica si hay un nombre de Pokemon proporcionado
    if(this.name){
      this.route.params.subscribe({
        next: (parametro) => {
           // Actualiza el nombre con el parametro de busqueda
          this.name = parametro['search']
          // Realiza la búsqueda de Pokemons
          this.pokemons=this.pokemonService.searchPokemon(this.name);
        }
      })
    }else {
      // Si no hay nombre de Pokemon, obtiene la lista completa de Pokemons
      this.pokemonService.getPokemons().subscribe({
        next: (pokemon) => {
          this.pokemons = pokemon
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
  
  // Método que se ejecuta cuando hay cambios en las propiedades del componente
  ngOnChanges(changes: SimpleChange){
    // Verifica si hay un nombre de Pokemon proporcionado
    if(this.name){
      this.route.params.subscribe({
        next:(params)=>{
           // Actualiza el nombre con el parámetro de búsqueda
          this.name=params['search'];
          // Realiza la búsqueda de Pokemons
          this.pokemons=this.pokemonService.searchPokemon(this.name);
        }
      })
    }else{ 
       // Si no hay nombre de Pokemon obtiene la lista completa de Pokemons
      this.pokemonService.getPokemons().subscribe((pokemonsList)=> {
        this.pokemons=pokemonsList;
      }
      )
    }  
  }

   // Metodo para navegar a la página de detalles de un Pokemon
  details(id: number){
    this.router.navigate(['/pokemons',id])
  }

  // Método para navegar a la pagina de edicion de un Pokemon
  edit(id: number){
    this.router.navigate(['edit', id])
  }

  // Método para eliminar un Pokemon
  delete(id:number){
    this.pokemonService.deletePokemon(id).subscribe({
      next: ()=> {
        console.log('Se elimino el pokemon');
        // Filtra la lista de Pokemons excluyendo el Pokemon eliminado
        this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id);
      }
      
    });
  }



}
