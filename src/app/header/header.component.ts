import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.services';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;
    isLoggedIn: boolean = false;

  constructor(private cartService: CartService, private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('ROLE') === 'ADMINISTRATOR';
  }

  logOut(): void {
    console.log('Logged out');
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
    window.location.reload();
  }

  navigateToCart(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/shopping-cart']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(() => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }
}
