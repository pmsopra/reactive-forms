import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { User } from './user';

// TODO extract to CustomValidator methods or sth like that
function range(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {
        range: true,
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userForm: FormGroup;
  user = new User();

  title = 'Welcome to my example form';
  description = 'Here you can exercise validation';
  ageMin = 12;
  ageMax = 30;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      nickname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      age: [null, range(this.ageMin, this.ageMax)]
    });
  }

  isInvalid() {
    return !this.userForm.valid;
  }

  onSubmit() {
    console.log(this.userForm);
    console.log('Saved: ' + JSON.stringify(this.userForm.value));
  }
}
