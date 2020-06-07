import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {

  transform(value: any, ...args: any[]): number {
    console.log(value, args);
    const arr: any = args[0];
    let total = 0;
    if (!arr || !arr.length) {
      return 0;
    }
    arr.forEach(t => total += t.amount);
    return total;
  }

}
