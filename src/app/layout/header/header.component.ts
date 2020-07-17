import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'src/app/services/cache.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  proRoute = '/joinaspro'
  constructor(private router: Router, private cacheService: CacheService) { }

  ngOnInit(): void {
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
