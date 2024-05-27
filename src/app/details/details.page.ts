import {Component, OnInit} from '@angular/core';
import {Pokemon, PokemonDetails, PokemonService} from "../api/pokemon.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  pokemon: PokemonDetails | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
  }

  ngOnInit() {
    this.pokemonDetails();
  }

  pokemonDetails() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonDetails(id).subscribe((pokemonDetail) => {
      this.pokemon = pokemonDetail;
    });
  }

  public formatNumber(num: number | undefined): string {
    return `#${String(num).padStart(4, '0')}`;
  }
}
