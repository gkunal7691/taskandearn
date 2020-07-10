import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  imageId: number = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.changeImage();
    }, 12000);

  }

  changeImage() {
    this.imageId = this.imageId + 1
    if (this.imageId > 3) {
      this.imageId = 0
    }
    console.log(this.imageId)
  }

}
