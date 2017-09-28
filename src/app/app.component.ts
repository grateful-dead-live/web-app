import { Component } from '@angular/core';
import { DeadApiService } from './dead-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title = 'app';
  private events
  private locations;

  constructor(private apiService: DeadApiService) {
    this.apiService.getEvents().then(e => this.events = e);
    this.apiService.getLocations().then(l => this.locations = l);
  }

}
