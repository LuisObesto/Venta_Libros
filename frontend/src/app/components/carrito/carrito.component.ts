import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private carritoService: CarritoService, private router: Router) { }

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
  DeleteItem(id) {
    for (let i = 0; i < this.items.length; i++){
      if (id == this.items[i].id){
          const libroActual = JSON.parse(sessionStorage.getItem('Libros'));
          libroActual.splice(i, 1 );
          const nuevoStrginDeObjetos = JSON.stringify(libroActual);
          sessionStorage.setItem('Libros', nuevoStrginDeObjetos);
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['carrito']);
          });
      }
    }
    return this.items;
  }

  ObtenerTotal(){
    for(let i = 0;i < this.items.length;i++){

        this.total = this.total + this.items[i].precio
    }
  }
}
