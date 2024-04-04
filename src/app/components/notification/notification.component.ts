import { Component, OnDestroy, OnInit } from '@angular/core';
import { faMedal, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Subscription } from 'rxjs';
import { NotificationInterface } from 'src/app/core/models/Notification';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  faIcon:IconDefinition = faMedal
  notificationSubscription!:Subscription
  currentNotif!:NotificationInterface
  constructor(private notficationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationSubscription = this.notficationService.getNotification().subscribe((v) => {
      this.currentNotif = v
    })
  }

  ngOnDestroy(){
    this.notificationSubscription.unsubscribe()
  }

}
