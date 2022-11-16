import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/users.model';
import { NgForm } from '@angular/forms';
import { last } from 'rxjs';
import Swal from 'sweetalert2';
import { Data } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    let response = this.userService.getUser();
    response.subscribe((res) => {
      this.userService.users = res;
      console.log(this.userService.users);
    });
  }

  createUsers(form: NgForm) {
    console.log(form.value);
    if (form.value._id) {
      this.updateUser(form.value);
      return;
    }
    delete form.value._id;

    let { firtsName, lastName, email, password, isAdmin } = form.value;
    if (!firtsName || !lastName || !email || !password || !isAdmin)
      return alert('Llena todos los campos');

    let createuser = this.userService.createUser(form.value).subscribe(
      (res) => {
        this.getAllUsers();
        alert(res);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error,
          text: 'Something went wrong!',
        });
      }
    );
  }

  delUser(id: string) {
    Swal.fire({
      title: 'Estas seguro de eliminar el elemento?',
      text: 'Esta accion no se podra deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUSer(id).subscribe((res: any) => {
          this.getAllUsers();
        });

        Swal.fire(
          'Borrado',
          'El elemento ha sido borrado exitsoamente',
          'success'
        );
      }
    });
  }

  updateUser(data: User) {
    this.userService.updateUser(data._id, data).subscribe((res) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500,
      });
      this.getAllUsers();
      this.userService.currentUser = new User();
    });
  }
  fillForm(user: User) {
    this.userService.currentUser = user;
  }
}
