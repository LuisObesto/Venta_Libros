import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  normalMessage(obj){

    Swal.fire({

      position : 'center',
      icon : obj.icon,
      html : obj.html,
      showConfirmButton : true
    })
  }

  async confirmMessage(obj){

    let result = await Swal.fire({
      title: '¡Atencion!',
      text: obj.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    })
    return result;
  }
}
