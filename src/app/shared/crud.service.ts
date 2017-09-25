import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class CrudService {

  constructor(private http: Http) { }

  get(url: string) {
    return this.http.get(url).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  post(url: string, data?: any) {
    return this.http.post(url, data).map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  put(url: string, data?: any) {
    return this.http.put(url, data).map((res: Response) => res)
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

}
