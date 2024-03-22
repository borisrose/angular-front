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


interface PieTooltipInterface {
  calloutLabelKey:string;
  angleKey:string;
}

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
  constructor(private olympicService: OlympicService, private router:Router) {
}

  ngOnInit(): void {

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

    const vph = this.valuePieHandler
    return `
      <button class="tooltip-button" id="tooltip-button-${params.datum[params.calloutLabelKey!]}" data-country="${params.datum[params.calloutLabelKey!]}">
        <div class="ag-chart-tooltip-title" style="background-color: ${params.color}">
          ${params.datum[params.calloutLabelKey!]}
        </div>
        <div class="ag-chart-tooltip-content">
        ${params.datum[params.angleKey]} | <a href="/details/${params.datum[params.calloutLabelKey!]}"> Détails </a>
        </div>
      </button>
      `
      
      ;
  }

  valuePieHandler(params:AgPieSeriesTooltipRendererParams){
    console.log('hello🟠', params)
    //this.router.navigate(['details'])
  }




}
