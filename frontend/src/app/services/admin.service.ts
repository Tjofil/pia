import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private backendUrl = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.backendUrl}/admin/login`, data)
  }

  changePass(data) {
    return this.http.post(`${this.backendUrl}/admin/changePass`, data);
  }

  update(data) {
    return this.http.post(`${this.backendUrl}/admin/update`, data);
  }
}
