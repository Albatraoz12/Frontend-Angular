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
  login!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  // url = 'http://localhost:8000/api/login';
  url = 'https://dinorage-api.herokuapp.com/api/login';

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

    this.http.post(this.url, data).subscribe(
      (result: any) => {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('id', result.data.user.id);
        this.router.navigate(['/secure']);
        // window.location.reload(); //Testa ifall det funkar efter backend är uppe i heroku.
      },
      (error: any) => {
        console.log('error');
        console.log(error);
      }
    );
  }
}
