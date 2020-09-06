import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items = []

  addToCart(id,nombre,precio,img,cantidad) {
    let obj = {
      id : id,
      nombre : nombre,
      precio : precio,
      img : img,
      cantidad : cantidad
    }
    if(sessionStorage.Libros)
    {
      this.items = JSON.parse(sessionStorage.getItem('Libros'));
    }else{
      this.items = [];
    }

    if(this.items.length > 0){
      for(let i = 0;i < this.items.length;i++){
        if(this.items[i].nombre == nombre){
          this.items[i].cantidad = this.items[i].cantidad + cantidad
          this.items[i].precio = this.items[i].precio + precio
          const valor = JSON.stringify(this.items)
          sessionStorage.setItem('Libros', valor)
          return this.items
        }
      }
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
