import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {

    if (!value) {
      return '';
    }

    return value.replace(value[0], value[0].toUpperCase());
  }

}
