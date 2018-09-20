import { AutoDj, DecisionType, TransitionType } from 'auto-dj';
import { DeadFeatureService } from './feature.service';
import { DeadApiService } from './dead-api.service';

export class Plunderphonics {

  private dj: AutoDj;

  constructor(private apiService: DeadApiService, private featureService: DeadFeatureService) {
    this.dj = new AutoDj(featureService, DecisionType.Default, undefined,
      TransitionType.Beatmatch);
  }

  async play() {
    await this.dj.isReady();
    const audioUris = await this.apiService.getDiachronic('goodlovin');
    console.log(await this.featureService.getBeats(audioUris[0]));
    //console.log(audioUris, features);
    //this.dj.playDjSet(audioUris, 8, true); //bars per song, cue point auto
  }

}