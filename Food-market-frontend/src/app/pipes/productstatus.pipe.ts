import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'productstatus'
})
export class ProductstatusPipe implements PipeTransform {

  transform(status: number) {
    if (status === 0) {
      return 'For Sale';
    } else if (status === 1) {
      return 'Sold out';
    }
  }

}
