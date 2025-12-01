import { Routes } from '@angular/router';
import { LoginPage } from './auth/loginPage/loginPage';
import { HomePage } from './auth/HomePage/HomePage';
import { PagePokemon } from './pokemon/page/pagePokemon/pagePokemon';
import { PokemonDetailPage } from './pokemon/page/pokemon-detail-page/pokemon-detail-page';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },

    { 
        path: 'login', 
        component: LoginPage 
    },

    { 
        path: 'home', 
        component: HomePage 
    },

    {
        path: 'PagePokemon',
        component: PagePokemon,
    },

    { 
        path: 'pokemon/:id', 
        component: PokemonDetailPage 
    },
    { 
        path: '**', 
        redirectTo: 'login' 
    }

];
