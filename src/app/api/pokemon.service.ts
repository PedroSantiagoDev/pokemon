import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, map, mergeMap, toArray} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/';
  private offset: number = 0;
  private limit: number = 12;
  public pokemons: Pokemon[] = [];

  constructor(private httpClient: HttpClient) {
  }

  public loadPokemons(event?: any) {
    this.getPokemon().subscribe((pokemonsList: Pokemon[]) => {
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

  private getPokemon(offset: number = this.offset, limit: number = this.limit) {
    return this.httpClient.get<unknown>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map((res: any) => res.results),
      mergeMap((pokemonSummaries: any[]) => from(pokemonSummaries)),
      mergeMap(pokemonSummary => this.httpClient.get(pokemonSummary.url)),
      map(pokemon => this.TransformPokemonData(pokemon)),
      toArray()
    );
  }

  private TransformPokemonData(pokemon: any): Pokemon {
    return {
      image: pokemon.sprites.front_default,
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((t: any) => t.type.name)
    };
  }
}

export interface Pokemon {
  image: string;
  id: number;
  name: string;
  types: string[];
}
