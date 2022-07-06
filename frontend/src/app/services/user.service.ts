import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  register(username, password, idCard, phone, name, surname) {
    const data = {
      username: username,
      password: password,
      phone: phone,
      name: name,
      surname: surname,
      idCard: idCard

    }
    return this.http.post(`${this.backendUrl}/users/register`, data);
  }

  login(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.backendUrl}/users/login`, data)
  }
}
