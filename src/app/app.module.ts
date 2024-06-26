import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MessageComponent } from './components/message/message.component';
import { TitleComponent } from './components/title/title.component';
import { ChartComponent } from './components/chart/chart.component';
import { AgChartsAngular } from 'ag-charts-angular';
import { HeaderComponent } from './layouts/header/header.component';
import { DetailsComponent } from './pages/details/details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationComponent } from './components/notification/notification.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, MessageComponent, TitleComponent, ChartComponent, HeaderComponent, DetailsComponent, NotificationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AgChartsAngular, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
