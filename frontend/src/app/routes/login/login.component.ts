import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgForm } from '@angular/forms';
import { last } from 'rxjs';
import Swal from 'sweetalert2';
import { NavigationError } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(public userService: UsersService, public router: Router) {}

  login() {
    const user = { email: this.email, password: this.password };
    this.userService.login(user).subscribe(
      (data) => {
        this.userService.setToken(data.token);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error,
          text: 'No coinciden las credenciales',
        });
      }
    );
  }
}
