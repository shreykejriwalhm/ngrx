import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate: Date;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log(this.maxDate);
    this.maxDate = new Date();
    console.log(this.maxDate);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    console.log(this.maxDate);
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

}
