import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0]
  }

}
