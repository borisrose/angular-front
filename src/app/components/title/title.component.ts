import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  constructor() { }
  @Input() title!:string;
  @Input() destination!:string;

  ngOnInit(): void {
  }

}
