import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private carritoService : CarritoService) { }

  items : any
  total =0
  ngOnInit(){
    this.ObtenerCarrito()
    this.ObtenerTotal()
  }
  ObtenerCarrito(){
    let bla = sessionStorage.getItem('Libros')
    let valor = JSON.parse(bla)
    console.log(valor)
    this.items = valor
  }

  ObtenerTotal(){
    for(let i = 0;i < this.items.length;i++){

        this.total = this.total + this.items[i].precio
        //total
    }
  }
}
