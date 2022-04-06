import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;

  private heroUrl = environment.heroUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    //clearing the input values
    this.register = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  //method to post information to database
  submit() {
    const formData = this.register.getRawValue();
    if (formData.password === formData.password_confirmation) {
      this.http.post(this.heroUrl + 'register', formData).subscribe(
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
