import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  private url = environment.heroUrl;

  ngOnInit(): void {
    this.login = this.fb.group({
      email: '',
      password: '',
    });
  }

  //lets user log in.
  submit() {
    const formData = this.login.getRawValue();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    this.http.post(this.url + 'login', data).subscribe(
      (result: any) => {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('id', result.data.user.id);
        this.router.navigate(['/secure']);
      },
      (error: any) => {
        console.log('error');
        console.log(error);
      }
    );
  }
}
