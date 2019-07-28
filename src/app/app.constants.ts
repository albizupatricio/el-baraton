import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConstants{
    constructor(){}
    
    public readonly BASE_URL: string = '';
    
    public readonly apiUrlRoutes = {
        products: '../mocks/products.json',
        categories: '../mocks/categories.json',
    }

    public readonly tabs = {
        cart: 0,
        paymentMethod: 1,
        summary: 2
    }
}