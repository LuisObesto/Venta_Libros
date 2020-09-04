import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  urlServer = environment.url
  endpoint = '';

  constructor(private http : HttpClient) { }

  private getHTTPOptions(){

    let httpOptions = {}
    if(sessionStorage.getItem('JWT')){
      httpOptions = {
        headers : new HttpHeaders({

          Authorization : "Bearer "+sessionStorage.getItem('JWT')
        })
      }
    }
    return httpOptions;
  }

  setEndPoint(endpoint){

    this.endpoint = endpoint;
  }

  async get(){

    try {
      const option = this.getHTTPOptions()

      return await this.http.get(`${this.urlServer}${this.endpoint}`,option).toPromise();
      
    } catch (error) {
      console.log(error);
    }
  }

  async post(obj){

    try {
      const option = this.getHTTPOptions()
      
      return await this.http.post(`${this.urlServer}${this.endpoint}`,obj,option).toPromise();

    } catch (error) {
      console.log(error)
    }
  }
}
