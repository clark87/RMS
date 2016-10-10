//# sourceMappingURL=car-parts.component.js.map

import { Component } from '@angular/core';
import {CarPart} from './car-part';
@Component({
  selector: 'car-parts',
  templateUrl:'app/car-parts.component.html',
  styleUrls:['app/car-parts.component.css']


})

export class CarPartsComponent { 
  title = 'Ultra Racing';
  carParts:CarPart[]=[{
    "id":1,
    "name":"Super Tires",
    "price":4.33,
    "description":"These tires are the very best",
    "inStock":5
  },
  
  {
    "id":2,
    "name":"Reinforced Shocks",
     "price":41.33,
    "description":"shocks made from Kryotonite",
    "inStock":4
  },
  {
    "id":3,
    "name":"Padded Seates",
     "price":14.33,
    "description":"super soft seats for a smooth ride",
    "inStock":0
  }];

  totalCarParts(){
    let sum =0;
    for (let carPart of this.carParts){
      sum += carPart.inStock;
    }
    return sum;
  }
}
