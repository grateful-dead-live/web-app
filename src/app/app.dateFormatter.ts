import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe ({
   name : 'formatDate'
})

export class DateFormatter implements PipeTransform {
  transform(value: string): string {
      return moment(value).format('MMMM Do YYYY');
  }
}
