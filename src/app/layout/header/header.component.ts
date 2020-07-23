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
    this.getUser()

    // console.log(this.cacheService.getCache('token'))
    // console.log(this.cacheService.getUserDetails())

  }

  header() {
    let User = this.cacheService.getUserDetails()
    if (User != undefined) {
      this.headerIcon = true
    } else {
      this.headerIcon = false
    }

  }

  getUser() {
    // let proUser = this.cacheService.getUserDetails().professionalId
    // console.log('proUser', proUser)
    if (this.cacheService.getUserDetails().professionalId == null) {
      this.joinButton = true
    } else {
      this.joinButton = false
    }
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
