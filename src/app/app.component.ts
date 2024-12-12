import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'GrabNgo';
    isAuthLayout = false;
    currentUrl = '';
    private routerSubscription!: Subscription;

    constructor(
        private location: Location,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        // Initial check for auth layout
        this.checkAuthLayout();

        // Subscribe to router events to track URL changes
        this.routerSubscription = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.checkAuthLayout();
        });
    }

    private checkAuthLayout(): void {
        // Update current URL
        this.currentUrl = this.router.url;

        // Check if the current URL includes 'auth'
        this.isAuthLayout = this.currentUrl.includes('auth');
    }

    ngOnDestroy(): void {
        // Unsubscribe to prevent memory leaks
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }
}