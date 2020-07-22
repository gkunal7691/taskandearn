import { Component, OnInit } from '@angular/core';
import { ProfessionalsService } from '../../../services/professionals.service';
import { CategoryService } from '../../../services/category.service'

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent implements OnInit {
  allProfessionalsList: any;
  pageTitle = 'Professionals'
  imageSrc = "../../../assets/template/images/Plumbing-banner.png"
  allCategories: any;
  proList: any;

  constructor(private CategoryService: CategoryService, private professionalService: ProfessionalsService) { }

  ngOnInit(): void {
    this.allProfessionals()
    this.allCategory()

  }
  allCategory() {
    this.CategoryService.getAllCategories().subscribe(res => {
      this.allCategories = res['data']
    })
  }

  allProfessionals() {
    this.professionalService.getAllProfessionals().subscribe(res => {
      this.allProfessionalsList = res.data
      console.log(res)
      this.proList = this.allProfessionalsList
    })
  }
  onFilter(id) {
    console.log(id)
    this.allProfessionalsList = this.proList.filter(item => {
      return item.professional.category.categoryId == id
    })

  }

}
