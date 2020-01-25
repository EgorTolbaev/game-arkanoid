import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home-app',
    template: `<div class = "center" style="padding-top: 273px;padding-bottom: 400px;">  
                    <h3>Арканоид</h3>           
                    <button type="button" class="btn btn-warning" (click)="goPlay()">Играть</button>
               </div>`,
    styles: [` 
               .center { 
                text-align: center; 
              }
       `]
})
export class HomeComponent {
    constructor(private router: Router) { }

    goPlay() {

        this.router.navigate(['/play']);
    }
}