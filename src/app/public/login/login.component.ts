import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  url = 'http://localhost:8000/oauth/token';

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: '2',
      client_secret: 'ocAOFawIruC6sBJy5FelblOilx6FODyqwNnxAYnf',
      scope: '*',
    };

    this.http.post(this.url, data).subscribe(
      (result: any) => {
        localStorage.setItem('token', result.access_token);
        this.router.navigate(['/secure']);
      },
      (error: any) => {
        console.log('error');
        console.log(error);
      }
    );
  }
}
