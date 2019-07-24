import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConstants{
    constructor(){}
    
    public readonly BASE_URL: string = 'https://swapi.co/api/';
    
    public readonly apiUrlRoutes = {
        product(id: string){
            return `product&${id}`;
        }
    }
}