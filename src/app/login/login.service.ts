import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_TASKS_SERVICES } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: String, password: String): Observable<any> {

  return  this.http.post(URL_TASKS_SERVICES + '/api/login', {
      email: email,
      password: password
    })
  }

  public saveToken(token: string): void {
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
  }

}
