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
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pokemonService.getPokemonDetails(id).subscribe((pokemonDetail) => {
      console.log(pokemonDetail); // Adicione este console.log para verificar os dados
      this.pokemon = pokemonDetail;
    });
  }
}
