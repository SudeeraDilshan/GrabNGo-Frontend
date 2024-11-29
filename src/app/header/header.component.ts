// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent {

// }  
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  navigateToCart() {
    if (this.cartItemCount > 0) {
      this.router.navigate(['shopping-cart']); 
    } else {
      this.router.navigate(['cart']); 
    }
  }

  ngOnInit() {
     
    this.cartService.cartItems$.subscribe(() => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }
}
