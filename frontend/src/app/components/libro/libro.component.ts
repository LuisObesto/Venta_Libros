import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from 'src/app/services/backend/libros.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  contador = 1;
  id_libro : any;
  libro : any ={};

  constructor(private activatedRoute : ActivatedRoute,
              private librosServiceBack : LibrosService,
              private carritoService : CarritoService) { }

  async ngOnInit(){

    this.id_libro = this.activatedRoute.snapshot.params.id;
    await this.getLibro(this.id_libro)
  }


  async getLibro(id){

    let result : any = await this.librosServiceBack.getSingle(id)
    this.libro = result.libro;
  }

  variarContador(reason){

    if(reason == 'sumar'){
      this.contador++
    }else{
      if(this.contador>1)
      this.contador--
    }
  }
  AgregarCarrito(){
    let cantidad = this.contador
    let nombre = this.libro.nombre + ` (${cantidad})`
    let precio = this.libro.Precio * cantidad
    let img = this.libro.img

    this.carritoService.addToCart(nombre,precio,img,cantidad)
  }
}
