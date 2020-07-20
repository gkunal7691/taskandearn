import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalsService } from 'src/app/services/professionals.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subCategoryList: any;

  constructor(private router: Router, private professionalService: ProfessionalsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('proId'))
    this.getProfessional();
  }

  getProfessional() {
    this.professionalService.getSelectedsubCat(this.route.snapshot.paramMap.get('proId')).subscribe((subCat) => {
      console.log(subCat)
      this.subCategoryList = subCat.data
      this.professionalService.subCat = subCat.data;
    })
  }
  onRequestQuote() {
    let _url = '/task?page=org';
    this.router.navigateByUrl(_url)
  }

}
