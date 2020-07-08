import { Pipe, PipeTransform } from '@angular/core';
import { validateEventsArray } from '@angular/fire/firestore';

@Pipe({
  name: 'joinIngredients'
})
export class JoinIngredientsPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): string {
    return Array.isArray(value) ? value.join(', ') : value
  }
}
