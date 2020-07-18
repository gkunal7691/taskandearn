import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-main-page',
  templateUrl: './login-main-page.component.html',
  styleUrls: ['./login-main-page.component.css']
})
export class LoginMainPageComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginEvent(value) {
    this.router.navigateByUrl('')
  }
}
