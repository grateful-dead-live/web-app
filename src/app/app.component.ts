import { Component } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/startWith";

import { DeadApiService, DeadEvent } from './dead-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private cols: Observable<number>;
  private events: DeadEvent[];
  private selectedEvent;
  private venue;
  private location;
  private weather;
  private setlist;
  private performers;
  private performerImages;

  constructor(private apiService: DeadApiService, private observableMedia: ObservableMedia) {
    this.apiService.getEvents()
      .then(e => this.events = e.sort())
      .then(() => this.eventSelected(this.events[Math.floor(Math.random()*this.events.length)]));
  }

  ngOnInit() {
    const grid = {"xs": 1, "sm": 2, "md": 3, "lg": 4, "xl": 5};
    this.cols = this.observableMedia.asObservable()
      .map(change => grid[change.mqAlias])
      .startWith(3);
  }

  eventSelected(event: DeadEvent) {
    this.selectedEvent = event;
    this.apiService.getVenue(event.id).then(v => this.venue = v);
    this.apiService.getLocation(event.id).then(l => this.location = l);
    this.apiService.getWeather(event.id).then(w => this.weather = w);
    this.apiService.getSetlist(event.id).then(s => this.setlist = s);
    this.apiService.getPerformers(event.id).then(p => this.performers = p)
      .then(()=>this.performerImages = this.performers.map(p => p.image).filter(i => i));
  }

}
