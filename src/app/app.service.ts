import { Injectable } from '@angular/core';
import { GlobalConstants } from './app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService{
    
    constructor(private _http: HttpClient, public constants: GlobalConstants){}
    
    httpGet(url: string, withBaseUrl: boolean = true): Observable<any>{
        let urlEndpoint = '';
        if(withBaseUrl){
            urlEndpoint = this.constants.BASE_URL + url;
        }else{
            urlEndpoint = url;
        }
        return this._http.get(urlEndpoint);
    }
    
}