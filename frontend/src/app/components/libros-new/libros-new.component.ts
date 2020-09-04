import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { ImagenesService } from 'src/app/services/backend/imagenes.service';
import { SwalService } from 'src/app/services/common/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libros-new',
  templateUrl: './libros-new.component.html',
  styleUrls: ['./libros-new.component.css']
})
export class LibrosNewComponent implements OnInit {

  form : FormGroup
  previewUrl : any;
  selectedFile : File;
  isLoaded :boolean;

  formObject={
    nombre : new FormControl('',[Validators.required]),
    Autor : new FormControl('',[Validators.required]),
    Paginas : new FormControl('',[Validators.required]),
    Prologo : new FormControl('',[Validators.required]),
    Editorial : new FormControl('',[Validators.required]),
    Idioma : new FormControl('',[Validators.required]),
    Fecha_Publicacion : new FormControl('',[Validators.required]),
    Precio : new FormControl('',[Validators.required]),
    foto : new FormControl('')
  }

  constructor(private serviceImg : ImagenesService,
              private swalService : SwalService,
              private router : Router) { }

  ngOnInit(){
    this.isLoaded = false
    this.form = new FormGroup(this.formObject)
    this.isLoaded = true
  }
  
  
  onFileSelected(event){

    const reader = new FileReader(); //
    const files = event.target.files; //almaceno lo que esta en el evento del input (change)
    if(files && files.length) { //si el usuario cargo imagen
      this.selectedFile = files[0] //almaceno lo que subio en un  file y no en un obj(filelist)
      reader.onload = (e)=>{ //
        this.previewUrl = reader.result; //muestra la imagen que se estaria subiendo
      }
      reader.readAsDataURL(this.selectedFile) //convertir a base 64 en el navegador
    }
  }

  async SubirImg(){

    let resp = await this.swalService.confirmMessage({text : 'Deseas dar de alta este libro'})

    if(resp.value){
    const fd = new FormData();
    const {nombre, Autor ,Paginas, Prologo, Editorial, Idioma, Fecha_Publicacion, Precio }=this.form.value
    fd.append("nombre",nombre)
    fd.append("Autor",Autor)
    fd.append("Paginas",Paginas)
    fd.append("Prologo",Prologo)
    fd.append("Editorial",Editorial)
    fd.append("Idioma",Idioma)
    fd.append("Fecha_Publicacion",Fecha_Publicacion)
    fd.append("Precio",Precio)
    fd.append("foto",this.selectedFile, this.selectedFile.name)

    const result = await this.serviceImg.create(fd)
    console.log(result)
    if(result){
      this.swalService.normalMessage({icon : 'success',html : 'Libro dado de alta'})
      this.router.navigate(['index'])
    }
    
  }else{
    this.form.reset()
    this.swalService.normalMessage({icon : 'error',html : 'Cancelado'})
  }
  }
}
