import { Component,OnInit,ElementRef, ViewChild } from '@angular/core';
import { Resultado } from 'src/app/interfaces/pokeapi';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private pokemonService: PokemonService){}
  @ViewChild('tarjetas') tarjetasElement!:ElementRef;

    listaPokemon:Resultado[]=[]
    pagina:number=1;
    cargando:boolean=false;
    pokemonSeleccionado?:Pokemon;
    detalle:boolean=false;

  ngOnInit():void{
this.cargarLista();
this.pokemonService.getById("150");
  }

  async cargarLista(){
    if(this.cargando) return;
    this.cargando=true;
    this.listaPokemon= [...this.listaPokemon, ...await this.pokemonService.getByPage(this.pagina)];
    this.pagina++;
    this.cargando=false
  }

  onScroll(e:any){
    console.log(e)
    if(
      Math.round(
        this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      )
    ===e.srcElement.scrollHeight){
      this.cargarLista()
    }
  }
  async tarjetaClickeada(id:string){
    this.pokemonSeleccionado = await this.pokemonService.getById(id);
  }

  cambiarEstadoDetalle(){
    if(this.pokemonSeleccionado) this.detalle = !this.detalle;
    console.log(this.detalle)
  }
}
