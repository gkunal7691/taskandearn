import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalsService } from '../services/professionals.service';

@Component({
  selector: 'app-hire-pro',
  templateUrl: './hire-pro.component.html',
  styleUrls: ['./hire-pro.component.css']
})
export class HireProComponent implements OnInit {
  categoryId;
  text;
  allTasks: any;
  allProfessionalsList: any;
  constructor(private route: ActivatedRoute, private professionService: ProfessionalsService) {
    this.categoryId = this.route.snapshot.queryParams["categoryId"];
    this.text = this.route.snapshot.queryParams["text"];
  }

  ngOnInit(): void {
    this.categoryId = parseInt(this.route.snapshot.queryParams["categoryId"]);
    this.text = this.route.snapshot.queryParams["text"];
    this.getSearchedProfessional();
  }

  getSearchedProfessional() {
    this.professionService.getSearchedProfessionals(this.categoryId, this.text).subscribe(res => {
      console.log(res)
      this.allProfessionalsList = res.data
    })
  }

}
