import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items = []

  addToCart(nombre,precio,img) {
    let obj = {
      nombre : nombre,
      precio : precio,
      img : img
    }
    if(sessionStorage.Libros)
    {
      this.items = JSON.parse(sessionStorage.getItem('Libros'));
    }else{
      this.items = [];
    }
    this.items.push(obj)
    const valor = JSON.stringify(this.items)
    sessionStorage.setItem('Libros', valor)
    return this.items

  }


  clearCart() {
    this.items = [];
    return this.items;
  }
}
