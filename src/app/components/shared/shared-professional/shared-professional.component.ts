import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shared-professional',
  templateUrl: './shared-professional.component.html',
  styleUrls: ['./shared-professional.component.css']
})
export class SharedProfessionalComponent implements OnInit, OnChanges {
  @Input() allProfessionalsList: any
  constructor(private router: Router) { }
  ngOnChanges(): void {
    console.log(this.allProfessionalsList)
  }

  ngOnInit(): void {
  }

  onViewProfile(proId) {
    console.log(proId)
    let _url = '/profile/' + proId
    this.router.navigateByUrl(_url)
  }
}
