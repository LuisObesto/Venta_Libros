import { Injectable } from '@angular/core';
import { BaseService } from '../common/base.service';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService extends BaseService{

  create(obj){
    try {
      
      this.setEndPoint('create-edit/libro/new')
      return this.post(obj)

    } catch (error) {
      throw error;
    }
    
  }
}
