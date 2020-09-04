import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //rutas por defecto de usuario no registrado
  rutas : any =[
    {link : 'index',description :'Home',icon : ''},
    {link : 'login', description : 'Ingresar', icon : ''}
  ]
  isLoaded :boolean;
  //permiso de usuario no registrado
  userInfo : any = 0;
  info_user : any;
  nombre_user : any;
  mail_user : any;
  constructor(private router : Router) { }

    cargarNavbar(permiso){

      switch(permiso){

        case "10": 
        //Admin
        this.rutas = [
          
          {link : 'create-edit/libro/new', description : 'Agregar Libro', icon : ''}, //Nueva navbar para Admin
          {link : 'index',description :'Home',icon : ''},

        ]
        break;

        case "5":
          //Comun registrado
          this.rutas = [
            {link : 'index',description :'Home',icon : ''},
          ]
          break;
          //Usuario no registrado
          case "0":
            this.rutas =[ ]
            break;
      }
    }


  ngOnInit() {
    
    this.isLoaded = false;

    this.permisonavbar()

     this.isLoaded = true;
  }
  logout(){

    localStorage.clear();
    sessionStorage.clear();

    location.href="/login"
  }
  //dependiendo de lo que hay en el sessionStorage dara un permiso al navbar para mostrrar algunas rutas
  permisonavbar(){

    if(sessionStorage.getItem('admin')){
      this.info_user = sessionStorage.getItem('admin')
      this.userInfo = JSON.parse(this.info_user);
      this.nombre_user = this.userInfo.usuario
      this.mail_user = this.userInfo.mail
      this.cargarNavbar(atob(this.userInfo.permiso))
    }else if(sessionStorage.getItem('user')){
      this.info_user = sessionStorage.getItem('user')
      this.userInfo = JSON.parse(this.info_user);
      this.nombre_user = this.userInfo.usuario
      this.mail_user = this.userInfo.mail
      this.cargarNavbar(atob(this.userInfo.permiso))
    }else{
      this.cargarNavbar(this.userInfo)
    }
  }

  salir(){
    if(sessionStorage.getItem('admin')){
     return true;
    }else if(sessionStorage.getItem('user')){
      return true
    }else{
      return false
    }
  }

}