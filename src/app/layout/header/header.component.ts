import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';
import { ProfessionalsService } from 'src/app/services/professionals.service';

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
  defaultLogoMock: string = "../../assets/template/images/user.svg";
  professionalImage: string = "";

  constructor(private router: Router, public cacheService: CacheService,
    private professionalsService: ProfessionalsService) { }

  ngOnInit(): void {
    this.header();
    this.getUser();
    this.getProfileImage();
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
    if (this.cacheService.getUserDetails()?.proId == null) {
      this.joinButton = true;
    } else {
      this.joinButton = false;
    }
  }

  private getProfileImage() {
    if (this.cacheService.getUserDetails() && this.cacheService.getUserDetails().proId) {
      this.professionalsService.getProfessionalImage(
        this.cacheService.getUserDetails().proId,
      ).subscribe((res: any) => {
        if (res.success) {
          this.professionalImage = res.data.img ? res.data.img.downloadLink : "";
        }
      });
    }
  }

  logout() {
    let proId = this.cacheService.getUserDetails().proId;
    this.cacheService.removeCache('token');
    this.cacheService = null;
    if (proId) {
      this.router.navigateByUrl('become-earner-login');
    } else {
      this.router.navigateByUrl("");
    }
  }

  userProfile() {
    if (this.cacheService.getUserDetails().userId) {
      this.router.navigateByUrl('/profile/' + this.cacheService.getUserDetails().userId);
    }
    else if (this.cacheService.getUserDetails().proId) {
      this.router.navigateByUrl('/become-earner-my-profile');
    }
  }
}