import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  name: string = "";

  constructor(private router : Router){}

  // Metodo llamado cuando se realiza una busqueda
  search(){
     // Navega a la ruta 'search' con el nombre como parametro
    this.router.navigate(['search', this.name])
  }

}
