import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessionalsService } from 'src/app/services/professionals.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  subCategoryList: any;
  about: boolean = true;
  userForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private professionalService: ProfessionalsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
    console.log(this.route.snapshot.paramMap.get('proId'))
    // this.getProfessional();
  }
  onClick(value) {
    if (value === 'about') {
      this.about = true;
    }
    else {
      this.about = false;
    }
  }
  getProfessional() {
    this.professionalService.getSelectedsubCat(this.route.snapshot.paramMap.get('proId')).subscribe((subCat) => {
      console.log(subCat)
      this.subCategoryList = subCat.data
      this.professionalService.subCat = subCat.data;
    })
  }
  onRequestQuote() {
    let _url = '/profile-detail/' + this.route.snapshot.paramMap.get('proId');
    this.router.navigateByUrl(_url)
  }

}
