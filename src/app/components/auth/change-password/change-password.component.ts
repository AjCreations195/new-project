import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm!: FormGroup;
  fieldTextType = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({

      password: ['', [Validators.required, Validators.pattern('(?=^.{6,}$)(?![.\n])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*$')]],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validators: this.MustMatch('password', 'confirmPassword')
      });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  MustMatch(password: any, confirmPassword: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['MustMatch']) {
        return;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ MustMatch: true })
      }
      else {
        confirmPasswordControl.setErrors(null)
      }
    }
  }

  onSubmit() {
    console.log(this.passwordForm.value);

  }


}
