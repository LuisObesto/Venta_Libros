import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items = [{}];

  addToCart(arr) {
    this.items.push(arr)
    let valor = JSON.stringify(this.items)
    console.log(arr)
    sessionStorage.setItem('Libros',valor)
    console.log(this.items)
    return this.items
    
  }


  clearCart() {
    this.items = [];
    return this.items;
  }
}
