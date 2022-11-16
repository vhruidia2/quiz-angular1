import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() image: string | undefined;
  @Input() btnText: string | undefined;
  @Input() btnColor: string | undefined;
  @Input() cardSize: string | undefined;
  @Input() stock: string | undefined;
  @Input() price: string | undefined;
  // @Input() options: any
  // /*{
  //   title: "",

  // }*/

  constructor() {}

  ngOnInit(): void {}

  buy(): void {
    Swal.fire(
      'Producto añadido al carrito',
      'You clicked the button!',
      'success'
    );
  }
}
