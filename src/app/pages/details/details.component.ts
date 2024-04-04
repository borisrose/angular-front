import { Component, OnDestroy, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';
import { ChartOptions } from 'src/app/core/models/ChartOptions';
import { Message } from 'src/app/core/models/Message';
import { NotificationService } from 'src/app/core/services/notification.service';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public olympics$: Observable<any> = of(null);
  public chartOptions!: ChartOptions
  olympicsSubscription!: Subscription
  routeSubscription!: Subscription

  public data!: { country: string, totalMedalsNumber: number, totalAthletesNumber: number, entriesNumber: number }
  public medalsData!: Message
  public entriesData!: Message
  public athletesData!: Message
  country!: string
  olympics: any


  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  
    this.olympics$ = this.olympicService.getOlympics();
    const self = this
    this.olympicsSubscription = this.olympics$.subscribe((value) => {
      this.olympics = value
      this.routeSubscription = this.route.params.subscribe((v) => {

        if (self.olympics.length > 0) {
          const result = self.olympics.find((c: { country: string }) => c.country === v['id'])


          if (result == undefined) {
            this.router.navigate(["/**"])
          }

          this.notificationService.setNotificationContent({
            title: result.country,
            content: 'Hey ! You are on the details page on: ' + result.country + '. To go back to the main page click on Olympics up left',
            type: 'info'
          })


          self.country = result.country
          self.entriesData = {
            mainIdea: 'Number of entries',
            content: result.participations.length,
            type: '2-data'
          }

          self.medalsData = {
            mainIdea: 'Total number of medals',
            content: 0,
            type: '2-data'
          }

          self.athletesData = {
            mainIdea: 'Total number of athletes',
            content: 0,
            type: '2-data'
          }

          for (const participation of result.participations) {
            self.medalsData.content += participation.medalsCount
            self.athletesData.content += participation.athleteCount
          }

          this.chartOptions = {
            data: result.participations,
            series: [
              {

                type: "line",
                xKey: "year",
                yKey: "medalsCount",
                yName: 'Medals Count',
                strokeWidth: 4,
                marker: {
                  enabled: false,
                },

              },
              {
                type: "line",
                xKey: "year",
                yKey: "athleteCount",
                yName: 'Athelete Count',
                strokeWidth: 4,
                marker: {
                  enabled: false,
                },
              },





            ],
            axes: [
              {
                type: "number",
                position: "left",
              },
              {
                type: 'category',
                position: 'bottom'
              }
            ],

          }
        }

      })
    })



  }




  ngOnDestroy() {
    this.olympicsSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
  }




}
