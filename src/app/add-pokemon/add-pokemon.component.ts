import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../interfaces/Pokemon';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './add-pokemon.component.html'
})
export class AddPokemonComponent implements OnInit{

  exito : boolean = false;
  @Input() id!: number;
  edit : boolean = false;

  pokemon: Omit<Pokemon,'id'> = {
    name: {
      english: '',
      japanese: '',
      chinese: '',
      french: ''
    },
    type: [],
    base: {
      HP: 0,
      Attack: 0,
      Defense: 0,
      "Sp. Attack": 0,
      "Sp. Defense": 0,
      Speed: 0
    },
    species: '',
    description: '',
    evolution: { next: ['',''] },
    profile: {
      height: '',
      weight: '',
      egg: [''],
      ability: [['', false]],
      gender: ''
    },
    image: {
      sprite: '',
      thumbnail: '',
      hires: ''
    }
  }

  constructor(private pokemonService : PokemonService,  private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        // Si hay un ID en los parametros, se activa el modo edicion
        this.edit = true;
        this.id = +id; // Convierte el ID a número
        // Obtener la informacion del Pokemon con el ID proporcionado
        this.pokemonService.getPokemon(this.id).subscribe({
          next: (pokemon) => {
            this.pokemon = { ...pokemon }; // Copia de la información del Pokemon
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    });
  }

  // Metodo que se ejecuta al enviar el formulario
  onSubmit() {
    if (this.edit) {
  
      this.pokemonService.editPokemon(this.id, this.pokemon).subscribe({
        next: (pokemon) => {
          this.exito = true;
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      // Lógica para la adición
      this.pokemonService.addPokemon(this.pokemon).subscribe({
        next: (newPokemon) => {
          this.pokemon = newPokemon; // Actualizar la información del Pokemon
          this.exito = true;
          console.log("Pokemon agregado con éxito");
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
  


}
