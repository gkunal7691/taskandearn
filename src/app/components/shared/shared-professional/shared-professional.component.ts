import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-shared-professional',
  templateUrl: './shared-professional.component.html',
  styleUrls: ['./shared-professional.component.css']
})
export class SharedProfessionalComponent implements OnInit, OnChanges {
  @Input() allProfessionalsList: any
  constructor() { }
  ngOnChanges(): void {
    console.log(this.allProfessionalsList)
  }

  ngOnInit(): void {
  }
}
