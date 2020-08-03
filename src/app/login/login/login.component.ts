import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserMaster } from 'src/app/models/user';
import { MessageService } from 'primeng';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";
  hasError: boolean = false;


  constructor(private loginService: LoginService, 
    private messageService: MessageService,
    private myRoute: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.userName.length == 0 || this.password.length == 0) {
      this.hasError = true;
      return;
    } else {
      this.hasError = false;
    }

    let temp:UserMaster = { userId: this.userName, password: btoa(this.password.split('').reverse().join('')) };
    this.loginService.checkLogin(temp).subscribe((result: boolean) => {
      this.loginService.isValidUser = result;
      sessionStorage.setItem("isLoggedIn", String(result));
      if (!result) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect Password' });
      } else {
        this.myRoute.navigate(['/upload-file']);
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to fetch data, server down' });
    });
  }

}
