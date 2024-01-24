import { Component, Input } from '@angular/core';
import { Pokemon } from '../interfaces/Pokemon';
import { PokemonService } from '../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  @Input() id:number=0;

  pokemon!: Pokemon;

  constructor(private pokemonService: PokemonService,private router:Router){}

  ngOnInit():void {

    this.pokemonService.getPokemon(this.id).subscribe(response=>{
      this.pokemon=response;
    })

  }

  return(){
    this.router.navigate(['/pokemons'])
  }

}
