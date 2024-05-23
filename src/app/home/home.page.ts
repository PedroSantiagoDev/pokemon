import {Component} from '@angular/core';
import {PokemonService} from "../api/pokemon.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public pokemonService: PokemonService) {
  }

  ngOnInit() {
    this.pokemonService.getPokemon();
  }

}
