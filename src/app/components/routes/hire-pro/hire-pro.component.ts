import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfessionalsService } from '../../../services/professionals.service';
import { CategoryService } from '../../../services/category.service'

@Component({
  selector: 'app-hire-pro',
  templateUrl: './hire-pro.component.html',
  styleUrls: ['./hire-pro.component.css']
})
export class HireProComponent implements OnInit {
  categoryId;
  text;
  allTasks: any;
  showFilter: boolean = false;
  allProfessionalsList: any;
  allCategories: any;
  catId: any
  proList: any;
  constructor(private CategoryService: CategoryService, private route: ActivatedRoute, private professionService: ProfessionalsService) {
    this.categoryId = this.route.snapshot.queryParams["categoryId"];
    this.text = this.route.snapshot.queryParams["text"];
    this.catId = this.categoryId
  }

  ngOnInit(): void {
    window.scrollTo(0, 0)
    this.categoryId = parseInt(this.route.snapshot.queryParams["categoryId"]);
    this.text = this.route.snapshot.queryParams["text"];
    this.getSearchedProfessional();
    this.allCategory()
  }
  allCategory() {
    this.CategoryService.getAllCategories().subscribe(res => {
      this.allCategories = res['data']
    })
  }
  getSearchedProfessional() {
    this.professionService.getSearchedProfessionals(this.categoryId, this.text).subscribe(res => {
      this.allProfessionalsList = res.data
    })
  }

  allProfessionals() {
    this.professionService.getAllProfessionals({}).subscribe(res => {
      this.allProfessionalsList = res.data
      this.proList = this.allProfessionalsList

    })
  }

  clear(value) {
    this.catId = false
    this.allProfessionals()

  }

  onFilter(id) {
    if (id !== 0) {
      this.allProfessionalsList = this.proList.filter(item => {
        return item.professional.category.categoryId == id
      })
    } else if (id == 0) {
      return this.allProfessionalsList
    }

  }

}
