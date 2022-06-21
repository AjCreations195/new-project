import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailForm!: FormGroup;
  submitted=false;
  isLoading=false;
  constructor(
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
          'email':new FormControl(null,[Validators.required, Validators.email])
    })
  }
  onSubmit(){
    
    console.log(this.emailForm.value);
    this.submitted = true;
   
  }

  get email(){
    return this.emailForm.get('email');
  }
}
