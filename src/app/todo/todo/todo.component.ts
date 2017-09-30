import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CrudService} from '../../shared/crud.service';
import * as _ from 'lodash';
import {setTime} from 'ngx-bootstrap/timepicker/timepicker.utils';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnChanges {


  @Input() public newTask: Task = {};


  @Input()
  public tasks: Array<Task> = [];

  private _url = 'http://cart-api.semicolon.guru';

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    console.log('Initializing App Component.');
    this.getTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  getTasks() {
    this.crudService.get(this._url + '/task').subscribe(res => {
      this.tasks = res;
      console.log(res);
    });
  }

  updateStatus(task: Task, flag) {
    task.state = '';
    this.crudService.put(this._url + '/task/' + task.id + '?status=' + flag)
      .subscribe(res => {
        const index = _.findIndex(this.tasks, {id: task.id});
        this.tasks.splice(index, 1, res);
        this.tasks = this.tasks.slice();
      });
  }

  updateDetails(task: Task) {
    task.state = '';
    this.crudService.put(this._url + '/task/' + task.id, task)
      .subscribe(res => {
      });
  }

  addToList() {
    this.crudService.post(this._url + '/task', this.newTask).subscribe(res => {
      this.tasks.push(res);
      this.tasks = this.tasks.slice();
    });
  }

  deleteTask(task) {
    this.crudService.delete(this._url + '/task/' + task.id)
      .subscribe(res => {
        const index = _.findIndex(this.tasks, {id: task.id});
        this.tasks.splice(index, 1);
        this.tasks = this.tasks.slice();
      });
  }
  clearNewTask() {
    this.newTask = {};
  }

}

export interface User {
  name?: string;
  address?: string;
  phone_number?: number;
  state?: string;
}

export interface Task {
  id?: string;
  taskDetails?: string;
  status?: boolean;
  state?: string;
}
