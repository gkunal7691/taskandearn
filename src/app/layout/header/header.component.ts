import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  proRoute = '/joinaspro'
  headerIcon: any;
  userId: any;
  joinButton: boolean = true;
  constructor(private router: Router, private cacheService: CacheService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.header()
  }

  header() {
    let User = this.cacheService.getUserDetails()
    this.userId = User['userId']

    this.getUser(this.userId)

    if (User != undefined) {
      this.headerIcon = true
    } else {
      this.headerIcon = false
    }
    // console.log(this.cacheService.getUserDetails())

  }

  getUser(id) {
    this.loginService.getUserById(id).subscribe(res => {
      if (res.data.proId == null) {
        this.joinButton = true
      } else {
        this.router.navigateByUrl('')
        this.joinButton = false
      }
    })
  }

  onMyTask() {
    console.log('workig')
    this.router.navigateByUrl('/mytasks')
  }
  appliedTasks() {
    this.router.navigateByUrl('/applied')

  }
  logout() {
    this.cacheService.removeCache('token');
    this.router.navigateByUrl('')
  }

  userProfile() {
    this.router.navigateByUrl('/profile')
  }
}
