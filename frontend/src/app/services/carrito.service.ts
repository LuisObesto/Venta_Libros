import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items =[]

  addToCart(nombre,precio,img) {
    let obj = {
      nombre : nombre,
      precio : precio,
      img : img
    }
    this.items.push(obj)
    let valor = JSON.stringify(this.items)
    console.log(this.items)
    sessionStorage.setItem('Libros',valor)
    console.log(this.items)
    return this.items
    
  }


  clearCart() {
    this.items = [];
    return this.items;
  }
}
