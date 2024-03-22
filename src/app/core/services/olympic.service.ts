import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Array<Olympic>>([]);

  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  loadInitialData() {
    return this.http.get<Array<Olympic>>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        this.notificationService.setNotificationContent({
          type:'error',
          content: 'An error occurred and we cannot display the metrics'
        })
        this.olympics$.next([]);
        return caught;
      })
    );
  }


  getOlympics() {
    return this.olympics$.asObservable();
  }
}
