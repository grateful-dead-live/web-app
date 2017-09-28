import { Injectable } from '@angular/core';

@Injectable()
export class DeadApiService {

  private API_URL = "http://localhost:8060/";

  constructor() {}

  getEvents(): Promise<{}> {
    return this.getFromApi('events');
  }

  getLocations(): Promise<{}> {
    return this.getFromApi('locations');
  }

  getFromApi(path: string): Promise<{}> {
    return fetch(this.API_URL+path)
      .then(r => r.text())
      .then(t => JSON.parse(t))
      .catch(e => console.log(e));
  }

}