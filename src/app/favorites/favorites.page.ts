import {Component, OnInit} from '@angular/core';
import {Pokemon, PokemonService} from "../api/pokemon.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  public favorites: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.loadFavorites();
  }

  public loadFavorites() {
    this.pokemonService.getFavorites().subscribe(favorites => this.favorites = favorites)
  }

  public removeFavorite(pokemon: Pokemon) {
    this.pokemonService.removeFavorite(pokemon);
    this.loadFavorites();
  }

  public formatNumber(num: string): string {
    return `#${String(num).padStart(4, '0')}`;
  }
}
