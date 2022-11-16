import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { NgForm } from '@angular/forms';
import { last } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(public productService: ProductService) {}

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
}
