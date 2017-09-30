import { Pipe, PipeTransform } from '@angular/core';
import {Task} from './todo.component';

@Pipe({
  name: 'active'
})
export class ActivePipe implements PipeTransform {

  transform(value: Array<Task>, args?: any): any {
    return value.filter( task => {
      return task.status === args;
    });
  }

}
