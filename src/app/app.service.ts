import { Injectable } from '@angular/core';
import { GlobalConstants } from './app.constants';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService{
    
    constructor(private _http: HttpClient, public constants: GlobalConstants){}
    
    private httpGet(url: string, withBaseUrl: boolean = true): Observable<any>{
        let urlEndpoint = './mocks/products.json';
        // if(withBaseUrl){
        //     urlEndpoint = this.constants.BASE_URL + url;
        // }else{
        //     urlEndpoint = url;
        // }
        return this._http.get(urlEndpoint);
    }
    
    public getProduct(){
        this.httpGet('pepe').subscribe((products)=>{
            console.log(products);
            debugger;
        });
        debugger;
        return this.httpGet('pepe');
    }
}