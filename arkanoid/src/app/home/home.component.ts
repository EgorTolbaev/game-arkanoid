import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'home-app',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(private router: Router) { }

    name1: string = "";

    submit(form: NgForm) {

        this.name1 = form.value.name;
        this.router.navigate(['/play']);
    }
    
}