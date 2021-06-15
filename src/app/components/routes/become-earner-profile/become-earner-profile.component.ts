import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/services/cache.service';
import { ProfessionalsService } from 'src/app/services/professionals.service';

@Component({
  selector: 'app-become-earner-profile',
  templateUrl: './become-earner-profile.component.html',
  styleUrls: ['./become-earner-profile.component.css']
})
export class BecomeEarnerProfileComponent implements OnInit {

  profileDetails: any;

  constructor(private professionalService: ProfessionalsService,
    private cacheService: CacheService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.professionalService.getProfile({ proId: this.cacheService.getUserDetails().proId }).subscribe(
      (res: any) => {
        this.profileDetails = res.data;
        console.log(this.profileDetails);
        
      })
  }


}
