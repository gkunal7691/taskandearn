import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-main-page',
  templateUrl: './register-main-page.component.html',
  styleUrls: ['./register-main-page.component.css']
})
export class RegisterMainPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  registration(value) {
    this.router.navigateByUrl('login')

  }

}
