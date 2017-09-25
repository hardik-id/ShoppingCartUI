import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataService} from './data.service';
import {CrudService} from './crud.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [DataService, CrudService]
})
export class SharedModule { }
