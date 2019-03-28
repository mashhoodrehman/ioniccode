import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CommonserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonserviceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CommonserviceProvider Provider');
  }

  postApi(url, header:string , data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    url = 'http://localhost:8000/api/'+url;

    return this.http.post(url,data, {headers: new HttpHeaders().set('Content-Type', 'application/json').set('value' , 'Bearer' + header)});

}



}
