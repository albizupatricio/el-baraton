import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConstants{
    constructor(){}
    
    public readonly BASE_URL: string = '';
    
    public readonly apiUrlRoutes = {
        products: '../mocks/products.json',
        categories: '../mocks/categories.json',
    }
}