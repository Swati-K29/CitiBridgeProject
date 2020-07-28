import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user:any;
  isUserLoggedIn: boolean;
  constructor(private loginService :LoginService,private router : Router) { }

  ngOnInit() {
    this.loginForm=new FormGroup({
      email : new FormControl(null),
      password : new FormControl(null)
    })
  }


  getFormData(formObject){// to get login form's data
    this.loginService.checkLoginCustomer(formObject).subscribe(
      data=>{
        this.user = data;
        this.isUserLoggedIn=true;
      },
      error=>{
        console.log(error)
        this.isUserLoggedIn=false;
      }
    )
  }
}
