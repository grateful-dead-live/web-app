import { Component } from '@angular/core';
import { DeadApiService, DeadEvent } from './dead-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private title = 'app';
  private events: DeadEvent[];
  private selectedEvent;
  private venue;

  constructor(private apiService: DeadApiService) {
    this.apiService.getEvents().then(e => this.events = e.sort());
  }

  private eventSelected(event: DeadEvent) {
    this.selectedEvent = event;
    this.apiService.getVenue(event.id).then(v => this.venue = v).then(()=>console.log(this.venue));
  }

}
