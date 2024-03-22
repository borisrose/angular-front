import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'src/app/core/models/ChartOptions';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() chartOptions!:ChartOptions
  constructor() {}

  ngOnInit(): void {

  }

}
