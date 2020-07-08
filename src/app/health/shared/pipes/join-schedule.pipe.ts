import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinSchedule'
})
export class JoinSchedulePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    if (value.type === 'strength') {      
      return `Weight: ${value.strength.weight + 'kg'}, Reps: ${value.strength.reps}, Sets: ${value.strength.sets}`      
    } else {      
      return `Distance: ${value.endurance.distance + 'km'}, Duration: ${value.endurance.duration + 'mins'}`
    }
  }

}
