import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, map, mergeMap, toArray} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/';
  public pokemons: Pokemon[] = [];

  constructor(private httpClient: HttpClient) {
  }

  public getPokemon(offset: number = 0, limit: number = 12) {
    return this.httpClient.get<unknown>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map((res: any) => res.results),
      mergeMap((pokemonSummaries: any[]) => from(pokemonSummaries)),
      mergeMap(pokemonSummary => this.httpClient.get(pokemonSummary.url)),
      map(pokemon => this.TransformPokemonData(pokemon)),
    ).subscribe((result: Pokemon) => this.pokemons.push(result));
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
