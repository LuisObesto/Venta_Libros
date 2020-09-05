import { Component, OnInit } from '@angular/core';
import { LibrosService } from 'src/app/services/backend/libros.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  libros : any=[]

  constructor(private  librosServiceBack : LibrosService,
              private carritoService : CarritoService) { }

  async ngOnInit(){

    this.getAllLibros()
    // sessionStorage.getItem('Libros');
  }

  async getAllLibros(){

    let result : any = await this.librosServiceBack.getLibros();
    this.libros = result.libros
  }

}
