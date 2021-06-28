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
  constructor(private router: Router, public cacheService: CacheService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.header()
    this.getUser()
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
    if (this.cacheService.getUserDetails()?.professionalId == null) {
      this.joinButton = true
    } else {
      this.joinButton = false
    }
  }

  onBtnClick() {
    if (this.cacheService.getUserDetails()) {
      this.router.navigateByUrl('/become-earner-login')
    } else {
      this.router.navigateByUrl('/become-earner-login')
    }
  }


  logout() {
    let x = this.cacheService.getUserDetails().proId;
    this.cacheService.removeCache('token');
    if (x) {
      this.cacheService = null;
      this.router.navigateByUrl('become-earner-login');
    } else {
      this.cacheService = null;
      this.router.navigateByUrl('');
      location.reload();
    }
  }

  userProfile() {

    if (this.cacheService.getUserDetails().userId) {
      this.router.navigateByUrl('/profile/' + this.cacheService.getUserDetails().userId)
    }

    if (this.cacheService.getUserDetails().proId) {
      this.router.navigateByUrl('/become-earner-profile')
    }

  }
}
