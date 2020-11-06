import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() details: any
  @Input() subCatList: any
  @Input() proProfile: boolean;
  // title: string = 'CDHR Services';
  // url = 'taskandearn';
  // introduction: string = 'We do every job right the first time.';
  task: string = 'The enjoyment of working on custom work and making your vision a reality..';
  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0, 0)
  }


}
