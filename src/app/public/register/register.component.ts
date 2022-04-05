import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.register = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  submit() {
    const formData = this.register.getRawValue();
    if (formData.password === formData.password_confirmation) {
      this.http
        .post('https://dinorage-api.herokuapp.com/api/register', formData)
        .subscribe(
          (result) => {
            console.log(result);
            this.router.navigate(['/login']);
          },
          (err) => console.log(err)
        );
    } else {
      alert('Password dont match !! Try again');
    }
  }
}
