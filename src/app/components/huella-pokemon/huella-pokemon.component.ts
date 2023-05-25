import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon';

@Component({
  selector: 'app-huella-pokemon',
  templateUrl: './huella-pokemon.component.html',
  styleUrls: ['./huella-pokemon.component.scss']
})
export class HuellaPokemonComponent {
  @Input() pokemon?:Pokemon;
}
