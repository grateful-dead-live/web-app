import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  private tickets;
  private posters;
  private recordings;
  private selectedRec;

  constructor(private apiService: DeadApiService, private observableMedia: ObservableMedia, private sanitizer: DomSanitizer) {
    this.apiService.getEvents()
      .then(e => this.events = e.sort())
      .then(() => this.eventSelected(this.events[Math.floor(Math.random()*this.events.length)]));
  }

  ngOnInit() {
    const grid = {"xs": 1, "sm": 2, "md": 4, "lg": 5, "xl": 6};
    this.cols = this.observableMedia.asObservable()
      .map(change => grid[change.mqAlias])
      .startWith(3);
  }

  eventSelected(event: DeadEvent) {
    this.selectedEvent = event;
    this.apiService.getVenue(event.id).then(v => this.venue = v);
    this.apiService.getPosters(event.id).then(p => this.posters = p);
    this.apiService.getTickets(event.id).then(t => this.tickets = t);
    this.apiService.getLocation(event.id).then(l => this.location = l);
    this.apiService.getWeather(event.id).then(w => this.weather = w);
    this.apiService.getSetlist(event.id).then(s => this.setlist = s);
    this.apiService.getRecordings(event.id).then(rs => this.initRecordings(rs));
    this.apiService.getPerformers(event.id).then(p => this.performers = p)
      .then(()=>this.performerImages = this.performers.map(p => p.image).filter(i => i));
  }

  private initRecordings(ids: string[]) {
    this.recordings = ids.map(r => ({id:r}));
    this.recordings.forEach(r =>
      r.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://archive.org/embed/"+r.id+"&playlist=1"));
    this.selectedRec = this.recordings[0];
  }

}
