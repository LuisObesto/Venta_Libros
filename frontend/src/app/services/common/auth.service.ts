import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  login(obj){

    try {
      
      this.setEndPoint('auth');
      return this.post(obj)

    } catch (error) {
      throw error;
    }
  }
}
