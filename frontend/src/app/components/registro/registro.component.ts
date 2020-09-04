import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/services/backend/registro.service';
import { SwalService } from 'src/app/services/common/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form : FormGroup
  isLoaded : boolean;

  registroForm={

    nombre : new FormControl('',[Validators.required]),
    apellido : new FormControl('',[Validators.required]),
    mail : new FormControl('',[Validators.required]),
    usuario : new FormControl('',[Validators.required]),
    contraseña : new FormControl ('',[Validators.required])
  }

  constructor(private register : RegistroService,
              private swalService : SwalService,
              private router : Router) { }

  ngOnInit() {

    this.createForm();
  }

  createForm(){

    this.isLoaded = false;
    this.form = new FormGroup(this.registroForm)
    this.isLoaded = true;
  }

  async registro(){

    let result : any = await this.register.registro(this.form.value)
    if(result.nuevo == 1){
      this.swalService.normalMessage({icon :'error', html : 'Usuario o mail ya registrados'})
      this.form.reset()
    }else{
      this.swalService.normalMessage({icon : 'success', html : 'Usuario registrado correctamente'})
      this.router.navigate(['login'])
    }
  }

}
