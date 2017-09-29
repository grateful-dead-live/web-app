import { Injectable } from '@angular/core';

export interface DeadEvent {
  id: string,
  date: string,
  location: string
}

@Injectable()
export class DeadApiService {

  private API_URL = "http://localhost:8060/";

  constructor() {}

  getEvents(): Promise<DeadEvent[]> {
    return this.getJsonFromApi('events');
  }

  getVenue(eventId: string): Promise<string> {
    return this.getJsonFromApi('venue?event='+encodeURIComponent(eventId));
  }

  getLocation(eventId: string): Promise<string> {
    return this.getJsonFromApi('location?event='+encodeURIComponent(eventId));
  }

  getJsonFromApi(path: string): Promise<{}> {
    return fetch(this.API_URL+path)
      .then(r => r.text())
      .then(t => JSON.parse(t))
      .catch(e => console.log(e));
  }

}