import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

// import 'rxjs/add/observable/throw';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FeedService {
  
  currentUser: any;
  apiUrl = 'http://localhost:8000/product/';
  options: any;
  constructor(private http: Http) {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.currentUser.token}`);
    this.options = new RequestOptions({ headers: headers });
    console.log(this.currentUser.userId);
    
  }
  getProducts() {
    return this.http.get(`${this.apiUrl}/getProducts?id=${this.currentUser.userId}`, this.options)
      .map((response: Response) => response.json());
  }
  addProduct(Ouser){
    
    Ouser.userId = this.currentUser.userId;
    console.log(Ouser);
    
    return this.http.post(`${this.apiUrl}/addProduct?id=${JSON.stringify(Ouser)}`, JSON.stringify(Ouser), this.options)
      .map((response: Response) => response.json());
  }
  updateProduct(Ouser) {
    Ouser.userId=this.currentUser.userId;
    return this.http.patch(`${this.apiUrl}/updateProduct?id=${JSON.stringify(Ouser)}`,JSON.stringify(Ouser), this.options)
      .map((response: Response) => response.json());
  }
  deleteProduct(productId){
    return this.http.delete(`${this.apiUrl}/removeProduct?id=${productId}`, this.options)
      .map((response: Response) => response.json());
  }
}

