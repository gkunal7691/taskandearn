import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  public categoryId: number;

  constructor(private CategoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(params => {
        this.categoryId = params['id'];
        this.getAllsubCategory(this.categoryId)
      }
      )
  }

  getAllsubCategory(id) {
    this.CategoryService.getAllSubCategories(id).subscribe(res => {
      console.log(res)
    })
  }

}
