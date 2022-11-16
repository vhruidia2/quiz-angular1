import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { NgForm } from '@angular/forms';
import { last } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    public productService: ProductService,
  
  ) {}

  ngOnInit(): void {
    this.getProducts();
    
  }

  getProducts() {
    let response = this.productService.getProducts();
    response.subscribe((res: any) => {
      this.productService.products = res;
      console.log(this.productService.products);
    });
  }

 

  createProduct(form: NgForm) {
  
    console.log(form.value); //{datos del formulario}
    if(form.value._id){
      this.updateProduct(form.value)
      return 
    }
    delete form.value._id

    let { name, description } = form.value;

    if (!name || !description) return alert('Diligencie todos los campos');

    this.productService.createProduct(form.value).subscribe((res) => {
      this.getProducts();
      Swal.fire(
        'Producto guardado exitosamente',
        'Preciosa ok para continuar',
        'success'
      )
      this.productService.currentProduct = new Product()
    });
  }

 

  deleteProduct(id: string) {
    Swal.fire({
      title: 'Estas seguro de eliminar el elemento?',
      text: "Esta accion no se podra deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe((res: any) => {
          this.getProducts();
         
        });

        Swal.fire(
          'Borrado',
          'El elemento ha sido borrado exitsoamente',
          'success'
        )
      }
    })
  }
  updateProduct(data: Product){

    this.productService.updateProduct(data._id, data).subscribe((res) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.getProducts()
      this.productService.currentProduct = new Product()
    })

  }

  fillForm(product: Product){
    this.productService.currentProduct = product
  }




  
}
