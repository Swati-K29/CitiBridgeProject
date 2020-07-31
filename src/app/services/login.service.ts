import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serviceUrl = "http://192.168.43.124:8080";
  
  constructor(private http:HttpClient) { }
  checkLogin(obj){
    return this.http.post(this.serviceUrl+ "/login",obj)
  }
}
