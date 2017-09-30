import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { ActivePipe } from './todo/active.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [TodoComponent, ActivePipe],
  exports: [TodoComponent]
})
export class TodoModule { }
