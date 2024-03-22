import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationInterface } from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification$ = new BehaviorSubject<NotificationInterface>({ type: "", content: "" });
  constructor() { }

  setNotificationContent(data: NotificationInterface) {
    this.notification$.next(data)
  }

  getNotification() {
    return this.notification$.asObservable()
  }

}
