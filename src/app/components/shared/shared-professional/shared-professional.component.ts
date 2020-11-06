import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-shared-professional',
  templateUrl: './shared-professional.component.html',
  styleUrls: ['./shared-professional.component.css']
})
export class SharedProfessionalComponent implements OnInit, OnChanges {
  @Input() allProfessionalsList: any
  @Input() allCategories: any
  @Input() showFilter: boolean
  @Input() catId: any
  @Output() filterEvent = new EventEmitter()
  @Output() clearEvent = new EventEmitter()

  constructor(private router: Router) { }
  ngOnChanges(): void {
  }

  ngOnInit(): void {
  }

  onViewProfile(proId) {
    let _url = '/profile/' + proId
    this.router.navigateByUrl(_url)
  }
  Onclear() {
    this.clearEvent.emit('clear')
  }

  filter(value) {
    this.filterEvent.emit(value)
  }
}
