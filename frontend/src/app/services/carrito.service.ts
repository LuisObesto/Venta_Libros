import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items = []

  addToCart(nombre,precio,img,cantidad) {
    let obj = {
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

    for(let i = 0;i < this.items.length;i++){
      if(this.items[i].nombre == nombre){
        this.items[i].cantidad = this.items[i].cantidad + cantidad
        this.items[i].precio = this.items[i].precio + this.items[i].precio
        console.log("MIRA LA CONCHA DE TU MADRE " + this.items[i].precio)
        console.log(this.items[i].cantidad)
      }

      else{
        this.items.push(obj)
        const valor = JSON.stringify(this.items)
        sessionStorage.setItem('Libros', valor)
        return this.items
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
