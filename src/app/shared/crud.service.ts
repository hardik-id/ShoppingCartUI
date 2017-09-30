import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
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
    return this.http.post(url, data).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  put(url: string, data?: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = new RequestOptions({headers : headers});
    return this.http.put(url, data, options).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  delete(url: string) {
    return this.http.delete(url).map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

}
