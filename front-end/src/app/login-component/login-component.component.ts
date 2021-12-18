import { Component, DoCheck, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  hide = true;
  isLoginForm: boolean = true;
  isinvalid: boolean = false;
 
  ngOnInit(): void { }

  loginEmail = new FormControl('', [Validators.required, Validators.email]);
  loginPassword = new FormControl('', [Validators.required]);
  contactNo = new FormControl('', [Validators.required]);

  signUpEmail = new FormControl('', [Validators.required, Validators.email]);
  signUpPassword = new FormControl('', [Validators.required]);
  signUpName = new FormControl('', [Validators.required]);
 // confirmPassword = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.loginEmail,
    password: this.loginPassword,
  });

  signUpForm = new FormGroup({
    email: this.signUpEmail,
    password: this.signUpPassword,
   // confirmPassword: this.confirmPassword,
    name : this.signUpName
  });

  signIn() {
    console.log("vaue",this.loginForm.value.email);
    var signinUrl = " http://localhost:8081/login"
    this.http.post<any>(signinUrl, this.loginForm.value).subscribe((res) => {
      if (res.result == 0) {
        console.log("if",res)
        this.isinvalid = true;
      }
      else{
        console.log("res",res.result)
        sessionStorage.setItem('email',this.loginForm.value.email)
        this.router.navigateByUrl('/home');
      }
    });
  }

  signUp() {
    console.log("vaue",this.loginForm.value);
    var signUpUrl = " http://localhost:8081/register"
    this.http.post<any>(signUpUrl, this.signUpForm.value).subscribe((res) => {
      if (res.result == 1) {
        this.router.navigateByUrl(''); 
        alert(" Registerd Successfully")

        this.isLoginForm = true     
      } 
    });
  }

  getErrorMessage() {
    if (this.loginEmail.hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginEmail.hasError('email') ? 'Not a valid email' : '';
  }
}
