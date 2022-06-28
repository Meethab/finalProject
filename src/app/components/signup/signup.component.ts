import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  
  constructor(private _http: HttpClient, private router: Router ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      mobile: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])

    })   
  }
// creating user
  signUp() {
    this._http.post<any>("http://localhost:3000/singup", this.signUpForm.value).subscribe(res => {
      alert("Sign Up successful")
      this.signUpForm.reset();
      this.router.navigate(['login']);
    }, err => {
      alert("Something wrong while sign up.")
    }
    )
  }

}
