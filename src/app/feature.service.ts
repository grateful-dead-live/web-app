import { Injectable } from '@angular/core';
import { FeatureService } from 'auto-dj';
import { DeadApiService } from './dead-api.service';

@Injectable()
export class DeadFeatureService implements FeatureService {

  private features = new Map<string, {}>();

  constructor(private apiService: DeadApiService) {}

  async getBeats(audioUri: string) {
    return (await this.getFeatures(audioUri))["beats"];
  }

  async getKeys(audioUri: string) {
    return (await this.getFeatures(audioUri))["key"];
  }

  async getLoudnesses(audioUri: string) {
    return (await this.getFeatures(audioUri))["loudness"];
  }

  private async getFeatures(audioUri: string): Promise<{}> {
    if (!this.features.has(audioUri)) {
      this.features.set(audioUri, await this.apiService.getFeatureSummary(audioUri));
    }
    return this.features.get(audioUri);
  }

}