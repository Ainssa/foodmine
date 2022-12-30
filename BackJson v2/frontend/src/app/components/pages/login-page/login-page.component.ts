import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginFrom! : FormGroup;
  isSubmitted = false;
  constructor( private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.loginFrom = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    throw new Error('Method not implemented.');
  }
  //creation de form control fc remplace: loginform.contains
  get fc(){
    return this.loginFrom.controls;
  }
  //submit part
  submit(){
    this.isSubmitted = true;
    if(this.loginFrom.invalid) return;
    alert(
      `email: ${this.fc['email'].value},
      password: ${this.fc['password'].value}`
    )
  }



}
