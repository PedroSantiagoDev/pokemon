import {Component, OnInit} from '@angular/core';
import {Pokemon, PokemonService} from "../api/pokemon.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private offset: number = 0;
  private limit: number = 12;
  public pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.loadPokemons();
  }

  public loadPokemons(event?: any) {
    this.pokemonService.getPokemon(this.offset, this.limit).subscribe((pokemonsList: Pokemon[]) => {
      this.pokemons = [...this.pokemons, ...pokemonsList];

      if (event) {
        event.target.complete();
      }
    });
  }

  public loadData(event: any) {
    this.offset += this.limit;
    this.loadPokemons(event);
  }

  public addFavorite(pokemon: Pokemon) {
    this.pokemonService.addFavorite(pokemon);
  }
}
