import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public defaultImage;
  public loading;
  public existProduct;
  
  //Reemplazar en un futuro
  public name: string = 'mollit';
  public quantity: number = 891;
  public price: string = '$5,450';
  public available: boolean = true;
  public sublevel_id: number = 3;
  public sublevel_name: string = 'Bebidas / Gaseosas / Sin azúcar';
  public id: string = '58b5a5b117bf36cf8aed54ab';



  constructor(private appService: AppService) { 
    this.defaultImage = '';
    this.loading = false;
    this.existProduct = false;
  }

  ngOnInit() {
    this.appService.getProduct();
    this.price = this.price.replace(',','.');
    this.loading = false;
    this.existProduct = true;
    this.defaultImage = 'url(\'../../../assets/default-image_600.png\')';
  }

}
