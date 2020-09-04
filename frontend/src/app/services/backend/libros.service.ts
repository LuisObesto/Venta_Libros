import { Injectable } from '@angular/core';
import { BaseService } from '../common/base.service';

@Injectable({
  providedIn: 'root'
})
export class LibrosService extends BaseService{

 async getLibros(){

  try {
    
    this.setEndPoint('libros/all')

    return this.get()

  } catch (error) {
    throw error;
  }
 }

 async getSingle(id){

  try {

    this.setEndPoint(`libros/single/${id}`)
    return this.get()
    
  } catch (error) {
    throw error;
  }
 }
 
 async createHeroe(obj){

  try {
    
    this.setEndPoint('create-edit/libro/new')
    return this.post(obj)

  } catch (error) {
  throw error    
  }
 }
}
