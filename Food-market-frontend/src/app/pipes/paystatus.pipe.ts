import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'paystatus'
})
export class PaystatusPipe implements PipeTransform {

  transform(status: number) {
    if (status === 0) {
      return 'waiting for payment';
    } else if (status === 1) {
      return 'paid successfully';
    }
  }

}
