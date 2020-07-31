import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LoginService } from 'src/app/services/login.service';

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


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.userName.length == 0 || this.password.length == 0) {
      this.hasError = true;
      return;
    } else {
      this.hasError = false;
    }
    let temp = { userName: this.userName, password: btoa(this.password) }
    this.loginService.checkLogin(temp).subscribe((result: boolean) => {
      this.isValidUser = result;
      if (result) {
        this.router.navigate(['/upload-file']);
      }
    })
  }

}
