import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { ChartOptions } from 'src/app/core/models/ChartOptions';
import { CountryMedals } from 'src/app/core/models/CountryMedals';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {
  AgPieSeriesTooltipRendererParams,
} from "ag-charts-community";
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<any> = of(null);
  public chartOptions!: ChartOptions
  public josCount!: number
  public josData!: { mainIdea: string, content: number, type: "2-data" }
  public countriesCount!: number
  public countriesData!: { mainIdea: string, content: number, type: "2-data" }
  olympicsSubscription!: Subscription
  constructor(
    private notificationService: NotificationService,
    private olympicService: OlympicService, 
    private router:Router) {
}

  ngOnInit(): void {

    this.notificationService.setNotificationContent({
      content:"",
      title:"",
      type:""
    })

    this.olympics$ = this.olympicService.getOlympics();

    this.olympicsSubscription = this.olympics$.subscribe((value) => {

      let formattedValues: CountryMedals[] = []

      for (const el of value) {
        formattedValues.push(this.formCountryMedals(el))
        
      }

      this.chartOptions = {
        data: formattedValues,
        series: [

          {
            type: 'pie',
            angleKey: 'medalsCount',
            calloutLabelKey: 'country',
            sectorLabel: {
              color: 'white',
              fontWeight: 'bold',
            },
            tooltip: {
              renderer: this.renderer,
              interaction: {
                enabled: true,
              }
            }
          }
        
        ],
      }
      this.countriesCount = value.length
      this.countriesData = {
        mainIdea: 'Number of countrie',
        content: this.countriesCount,
        type: '2-data'
      }
      this.josData = {
        mainIdea: 'Number of JOs',
        content: 10,
        type: '2-data'
      }
  
 
    

     

    })

   

  }

  ngOnDestroy() {
    this.olympicsSubscription.unsubscribe()
  }

  formCountryMedals(data: Olympic) {
    let formattedData = {
      country: data.country,
      medalsCount: 0
    }
    for (const participation of data.participations) {
      formattedData.medalsCount += participation.medalsCount
    }

    return formattedData
  }




  renderer(params: AgPieSeriesTooltipRendererParams) {

   
    return `
      <button class="tooltip-button" id="tooltip-button-${params.datum[params.calloutLabelKey!]}" data-country="${params.datum[params.calloutLabelKey!]}">
        <div class="ag-chart-tooltip-title" style="background-color: ${params.color}">
          ${params.datum[params.calloutLabelKey!]}
        </div>
        <div class="ag-chart-tooltip-content">
        <a href="/details/${params.datum[params.calloutLabelKey!]}" style="display:flex;align-items:center; justify-content:space-evenly"> 
        <span aria-label="number of medals">${params.datum[params.angleKey]}</span> |
        <figure style="width:15px;height:15px;display:inline-block;margin:0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M223.8 130.8L154.6 15.5A32 32 0 0 0 127.2 0H16C3.1 0-4.5 14.6 2.9 25.2l111.3 159c29.7-27.8 67.5-46.8 109.6-53.4zM496 0H384.8c-11.2 0-21.7 5.9-27.4 15.5l-69.1 115.2c42 6.6 79.8 25.6 109.6 53.4L509.1 25.2C516.5 14.6 508.9 0 496 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.5 157.3l-37.9 37 9 52.2c1.6 9.4-8.3 16.5-16.7 12.1L256 393.9l-46.9 24.7c-8.4 4.5-18.3-2.7-16.7-12.1l9-52.2-37.9-37c-6.8-6.6-3.1-18.2 6.4-19.6l52.4-7.6 23.4-47.5c2.1-4.3 6.2-6.4 10.3-6.4 4.1 0 8.2 2.1 10.3 6.4l23.4 47.5 52.4 7.6c9.4 1.4 13.2 13 6.4 19.6z"/></svg>
        </figure>
        </a>
        </div>
      </button>
      `
      
      ;
  }






}
