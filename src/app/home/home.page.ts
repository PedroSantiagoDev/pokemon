import {Component, OnInit} from '@angular/core';
import {Pokemon, PokemonService} from "../api/pokemon.service";
import {debounce, debounceTime, distinct, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private offset: number = 0;
  private limit: number = 12;
  public pokemons: Pokemon[] = [];
  public filteredPokemons: Pokemon[] = [];
  public searchTerm: string = '';

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.loadPokemons();
  }

  public loadPokemons(event?: any) {
    this.pokemonService.getPokemon(this.offset, this.limit).subscribe((pokemonsList: Pokemon[]) => {
      this.pokemons = [...this.pokemons, ...pokemonsList];
      this.filteredPokemons = this.pokemons;

      if (event) {
        event.target.complete();
      }
    });
  }

  public loadData(event: any) {
    this.offset += this.limit;
    this.loadPokemons(event);
  }

  public searchPokemon() {
    if (!this.searchTerm) {
      this.filteredPokemons = this.pokemons;
    } else {
      this.pokemonService.searchPokemon(this.searchTerm).subscribe(pokemon => {
        this.filteredPokemons = [pokemon];
      }, error => {
        this.filteredPokemons = [];
      });
    }
  }

  public addFavorite(pokemon: Pokemon) {
    this.pokemonService.addFavorite(pokemon);
  }

  public formatNumber(num: string): string {
    return `#${String(num).padStart(4, '0')}`;
  }
}
