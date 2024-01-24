import { Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ListarPokemonComponent } from './listar-pokemon/listar-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [

    {path:'', component:ListarPokemonComponent},
    {path:'pokemons', component:ListarPokemonComponent},
    {path: 'add', component: AddPokemonComponent},
    {path:'pokemons/:id', component:DetailsComponent},
    { path: 'edit/:id', component: AddPokemonComponent },
    {path: 'search/:search', component: ListarPokemonComponent},
];
