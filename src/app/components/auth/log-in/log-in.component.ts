import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router' ;
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  fieldTextType = false;
  isLoading = false;
  error: string | null = null;
  constructor(private authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern('(?=^.{6,}$)(?![.\n])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$')])
    })
  }
  isLogin = true;

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    console.log(this.loginForm.value);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password
    this.isLoading = true;
    this.error =null;
    this.authService.logIn(email, password).subscribe({
      next: resData => {
        console.log(resData);
        this.isLoading = false
        this.error =null
        this.router.navigate(['/home'])
      },
      error: errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        // this.error = errorRes.error.error.message;
        this.isLoading = false;
        
      }
    })
    this.loginForm.reset();
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
