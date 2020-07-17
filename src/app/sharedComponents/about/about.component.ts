import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title: string = 'CDHR Services';
  url = 'taskandearn // Tv Wall Mount install // CDHR Services';
  introduction: string = 'We do every job right the first time.';
  task: string = 'The enjoyment of working on custom work and making your vision a reality..';
  constructor() { }

  ngOnInit(): void {
  }

}
