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
    return this.getStringFromApi('venue?event='+encodeURIComponent(eventId));
  }

  getJsonFromApi(path: string): Promise<{}> {
    return this.getStringFromApi(path)
      .then(t => JSON.parse(t));
  }

  getStringFromApi(path: string): Promise<string> {
    return fetch(this.API_URL+path)
      .then(r => r.text())
      .catch(e => console.log(e));
  }

}