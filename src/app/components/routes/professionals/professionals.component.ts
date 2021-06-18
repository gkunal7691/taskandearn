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
  pageTitle = 'Professionals';
  allCategories: any;
  proList: any;

  constructor(private CategoryService: CategoryService, private professionalService: ProfessionalsService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
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
      this.proList = this.allProfessionalsList
      // this.allProfessionalsList.forEach(element => {
      //   return element.professional !== undefined
      // });
    })
  }
  onFilter(id) {
    if (id !== 0) {
      this.allProfessionalsList = this.proList.filter(item => {
        if (item.category)
          return item.category.categoryId == id
      })
    } else if (id == 0) {
      return this.allProfessionalsList
    }

  }

  clear(value) {
    this.allProfessionals()
  }

}
