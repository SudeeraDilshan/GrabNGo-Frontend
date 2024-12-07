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

  constructor(private cartService: CartService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  isUser(): boolean {
    return localStorage.getItem('role') === 'User';
  }

  logOut(): void {
    console.log('Logged out');
    this.clearLocalStorage();
    this.router.navigate(['/login']); 
  }

  clearLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }

  navigateToCart(): void {
    if (this.isLoggedIn()) {
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
