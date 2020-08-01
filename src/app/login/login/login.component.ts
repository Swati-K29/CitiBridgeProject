import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from 'src/app/services/login.service';
import { UserMaster } from 'src/app/models/user';
import { MessageService } from 'primeng';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userName: string = "";
  password: string = "";
  isValidUser: boolean;
  hasError: boolean = false;


  constructor(private loginService: LoginService, 
    private messageService: MessageService,
    private router: Router) { }

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
      this.isValidUser = result;
      if (result) {
        this.router.navigate(['/upload-file']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect Password' });
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to fetch data, server down' });
    });
  }

}
