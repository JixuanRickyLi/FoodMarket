import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderstatus'
})
export class OrderstatusPipe implements PipeTransform {

  transform(status: number) {
    if (status === 0) {
      return 'new order';
    } else if (status === 1) {
      return 'In Delivering';
    } else if (status === 2) {
      return 'cancelled order';
    }
  }

}
