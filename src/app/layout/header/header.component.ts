import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  proRoute = '/joinaspro';
  headerIcon: any;
  userId: any;
  joinButton: boolean = true;

  constructor(private router: Router, public cacheService: CacheService) { }

  ngOnInit(): void {
    this.header()
    this.getUser()
  }

  header() {
    let User = this.cacheService.getUserDetails();
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

  logout() {
    let x = this.cacheService.getUserDetails().proId;
    this.cacheService.removeCache('token');
    if (x) {
      this.cacheService = null;
      this.router.navigateByUrl('become-earner-login');
    } else {
      this.cacheService = null;
      this.router.navigateByUrl("");
    }
  }

  userProfile() {
    if (this.cacheService.getUserDetails().userId) {
      this.router.navigateByUrl('/profile/' + this.cacheService.getUserDetails().userId);
    }
    else if (this.cacheService.getUserDetails().proId) {
      this.router.navigateByUrl('/become-earner-profile');
    }
  }
}
