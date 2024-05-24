import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../api/pokemon.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.pokemonService.loadPokemons();
  }

  addPokemonToList(event: any) {
    this.pokemonService.loadData(event);
  }

}
