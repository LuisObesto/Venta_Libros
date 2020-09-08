import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { AuthService } from 'src/app/services/common/auth.service';
import * as jwt_decode from "jwt-decode"
import { Router } from '@angular/router';
import { SwalService } from 'src/app/services/common/swal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;
  isLoaded : boolean;
  loginForm = {

    usuario : new FormControl ('',[Validators.required]),
    contraseña : new FormControl ('',[Validators.required])
  }

  constructor(private authService : AuthService, private swalService : SwalService) { }

  ngOnInit() {

    this.createForm();
  }

  createForm(){
    this.isLoaded = false;
    this.form = new FormGroup(this.loginForm);
    this.isLoaded = true;
  }

  async auth(){

    let result : any = await this.authService.login(this.form.value)
    //ver Clase 14 min 30.48
    try {

      if (result.hasOwnProperty('JWT')){

        //saco info del JWT en este caso permiso
        let decode = jwt_decode(result.JWT)
        //lo oculto (encodear)
        let permiso = btoa(decode.id_permiso)
        //creo las session 
        sessionStorage.setItem('JWT',result.JWT)
        sessionStorage.setItem(`${decode.role}`,JSON.stringify({usuario : result.User, permiso : permiso, mail : result.mail}))
  
        location.href="/index"
  
      }
      
    } catch (error) {

        this.swalService.normalMessage({icon :'error', html : "Usuario o contraseña incorrectos"})
        this.form.reset()
      
    }
   
  }
}
