import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GrabNgo';
  isAuthLayout = false;

  constructor(private location: Location) {
    
  }

  ngOnInit(): void {
    this.isAuthLayout = this.location.path().includes("auth");
    
  }

}
