import { Injectable } from '@angular/core';
import { BaseService } from '../common/base.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService extends BaseService{

  registro(obj){

    try {
      
      this.setEndPoint('users/new')
      return this.post(obj)

    } catch (error) {
      throw error
    }
  }
}
