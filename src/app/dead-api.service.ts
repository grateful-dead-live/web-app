import { Injectable } from '@angular/core';

export interface DeadEvent {
  id: string,
  date: string,
  location: string
}

@Injectable()
export class DeadApiService {

  private API_URL = "https://grateful-dead-api.herokuapp.com/";//"http://localhost:8060/";

  constructor() {}

  getEvents(): Promise<DeadEvent[]> {
    return this.getJsonFromApi('events');
  }

  getVenue(eventId: string): Promise<string> {
    return this.getJsonFromApi('venue?event='+encodeURIComponent(eventId));
  }

  getPosters(eventId: string): Promise<string> {
    return this.getJsonFromApi('posters?event='+encodeURIComponent(eventId));
  }

  getTickets(eventId: string): Promise<string> {
    return this.getJsonFromApi('tickets?event='+encodeURIComponent(eventId));
  }

  getLocation(eventId: string): Promise<string> {
    return this.getJsonFromApi('location?event='+encodeURIComponent(eventId));
  }

  getWeather(eventId: string): Promise<string> {
    return this.getJsonFromApi('weather?event='+encodeURIComponent(eventId));
  }

  getSetlist(eventId: string): Promise<string[]> {
    return this.getJsonFromApi('setlist?event='+encodeURIComponent(eventId));
  }

  getRecordings(eventId: string): Promise<string[]> {
    return this.getJsonFromApi('recordings?event='+encodeURIComponent(eventId));
  }

  getPerformers(eventId: string): Promise<{}[]> {
    return this.getJsonFromApi('performers?event='+encodeURIComponent(eventId));
  }

  getJsonFromApi(path: string): Promise<{}> {
    return fetch(this.API_URL+path)
      .then(r => r.text())
      .then(t => JSON.parse(t))
      .catch(e => console.log(e));
  }

}