import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {from, map, mergeMap, Observable, of, Subject, toArray} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/';
  private favoritesKey: string = 'favoritePokemons';

  constructor(private httpClient: HttpClient) {
  }

  public getPokemon(offset: number, limit: number): Observable<Pokemon[]> {
    return this.httpClient.get<PokemonResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map((res: PokemonResponse) => res.results),
      mergeMap((pokemonSummaries: PokemonSummary[]) => from(pokemonSummaries)),
      mergeMap((pokemonSummary: PokemonSummary) => this.httpClient.get(pokemonSummary.url)),
      map(pokemon => this.transformPokemonData(pokemon)),
      toArray()
    );
  }

  public getPokemonDetails(id: number): Observable<PokemonDetails> {
    return this.httpClient.get<unknown>(`${this.baseUrl}/pokemon/${id}`).pipe(
      map(pokemon => this.transformPokemonDataDetails(pokemon))
    );
  }

  public getFavorites(): Observable<Pokemon[]> {
    const favorites = JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
    return of(favorites);
  }

  public searchPokemon(value: string): Observable<Pokemon> {
    return this.httpClient.get(`${this.baseUrl}/pokemon/${value.toLowerCase()}`).pipe(
      map(pokemon => this.transformPokemonData(pokemon))
    );
  }

  public addFavorite(pokemon: Pokemon): void {
    const favorites = JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
    if (!favorites.find((res: Pokemon) => res.id === pokemon.id)) {
      favorites.push(pokemon);
      localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    }
  }

  public removeFavorite(pokemon: Pokemon): void {
    let favorites = JSON.parse(localStorage.getItem(this.favoritesKey) || '[]');
    favorites = favorites.filter((res: Pokemon) => res.id !== pokemon.id);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  private transformPokemonData(pokemon: any): Pokemon {
    return {
      id: pokemon.id, image: pokemon.sprites.front_default,
      name: pokemon.name,
      types: pokemon.types.map((t: any) => t.type.name)
    };
  }

  private transformPokemonDataDetails(pokemon: any): PokemonDetails {
    return {
      id: pokemon.id, image: pokemon.sprites.front_default,
      name: pokemon.name,
      base_experience: pokemon.base_experience,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities.map((a: any) => a.ability.name),
      sprites: pokemon.sprites.front_default,
      stats: pokemon.stats.map((s: any) => `${s.stat.name}: ${s.base_stat}`),
      types: pokemon.types.map((t: any) => t.type.name),
      species: pokemon.species.name
    };
  }
}

export interface Pokemon {
  id: string;
  image: string;
  name: string;
  types: string[];
}

export interface PokemonDetails {
  id: number;
  image: string;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: string[];
  sprites: string;
  stats: string[];
  types: string[];
  species: string[];
}

interface PokemonResponse {
  results: PokemonSummary[];
}

interface PokemonSummary {
  name: string;
  url: string;
}
