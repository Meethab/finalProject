import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm!: FormGroup;

  constructor(private _http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  //login method
  logIn() {
    this._http.get<any>("http://localhost:3000/singup").subscribe(res => {
      const user = res.find((a: any) => {
        return a.email === this.logInForm.value.email && a.password === this.logInForm.value.password;
      })
      if (user) {
        alert("User Log In Successful!");
        this.logInForm.reset;
        this.router.navigate(['restaurant-record']);
      }
      else {
        alert("User Not Found!");
      }
    }, err => {
      alert("Something wrong in server side!")
    })
  }

}
