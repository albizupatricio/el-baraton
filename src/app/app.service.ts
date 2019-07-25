import { Injectable } from '@angular/core';
import { GlobalConstants } from './app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService{
    
    constructor(private http: HttpClient, public constants: GlobalConstants){}
    
    public httpGet(url: string, mockedData: boolean = false): Observable<any>{
        let urlEndpoint = '';
        if(!mockedData){
            urlEndpoint = this.constants.BASE_URL + url;
        }else{
            urlEndpoint = url;
        }
        return this.http.get(urlEndpoint);
    }
}