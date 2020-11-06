import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../../services/category.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  public categoryId: any;
  // subCategoryList: any;
  isDisabled: boolean = true;

  @Input() subCategoryList: any
  @Output() subCatListValue = new EventEmitter()
  subCatValues = [];

  constructor(private CategoryService: CategoryService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }


  onChange(event, value) {
    this.isDisabled = false;
    if (event === true) {
      // this.isDisabled = false;

      this.subCatValues.push(value)
    }
    else {
      this.subCatValues.forEach((x, i, a) => {
        if (x.subCategoryId == value.subCategoryId) {
          this.subCatValues.splice(i, 1)
          if (this.subCatValues.length == 0) {
            this.isDisabled = true;
          }
        }
      })
    }

  }

  onNext() {
    this.subCatListValue.emit(this.subCatValues)
  }

  onBack() {
    this.subCatListValue.emit('Back')
  }

}
