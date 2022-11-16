import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/users.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL_API = 'http://localhost:5000/users';
  users: any;
  currentUser: User;

  constructor(public http: HttpClient) {
    this.currentUser = new User();
  }

  getUser() {
    return this.http.get(`${this.URL_API}/get-all-users`);
  }

  createUser(data: User) {
    return this.http.post(`${this.URL_API}/create-user`, data);
  }
    deleteUSer(id:string){
      return this.http.delete(`${this.URL_API}/delete-user?id=${id}`)
    }

    updateUser(id:string, data: User){
      return this.http.put(`${this.URL_API}/update-user?id=${id}`,data)
    }
}
