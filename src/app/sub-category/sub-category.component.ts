import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../services/category.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  public categoryId: any;
  subCategoryList: any;
  @Input() categorysId: any
  @Output() subCatList = new EventEmitter()
  @Output() subCatListValue = new EventEmitter()
  subCatValues = [];
  constructor(private CategoryService: CategoryService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.getAllsubCategory(this.categorysId)
  }

  getAllsubCategory(id) {
    console.log(id)
    this.CategoryService.getAllSubCategories(id).subscribe(res => {
      // console.log(res)
      this.subCategoryList = res['data']
      this.subCatList.emit(res['data'])
    })
  }

  onChange(event, value) {
    console.log(event, value)
    if (event === true) {
      this.subCatValues.push(value)
    }
    else {
      this.subCatValues.forEach((x, i, a) => {
        if (x.subCategoryId == value.subCategoryId) {
          this.subCatValues.splice(i, 1)
        }
      })
    }
    console.log(this.subCatValues)
    this.subCatListValue.emit(this.subCatValues)
  }

}
