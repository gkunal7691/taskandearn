import { Component, OnInit } from '@angular/core';
import { ProfessionalsService } from '../services/professionals.service';

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit {
  allProfessionalsList: any;

  constructor(private professionalService: ProfessionalsService) { }

  ngOnInit(): void {
    this.allProfessionals()

  }

  allProfessionals() {
    this.professionalService.getAllProfessionals().subscribe(res => {
      this.allProfessionalsList = res.data
      console.log(res)
    })
  }

}
