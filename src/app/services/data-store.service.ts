import { RestaurantData } from './../models/restaurant.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private _restaurant: BehaviorSubject<RestaurantData[] | any> = new BehaviorSubject(null);
  restaurant$: Observable<RestaurantData[]> = this._restaurant.asObservable();
  
  restauranteditObj :RestaurantData = new RestaurantData;
  
  constructor() { }

  setRestaurant(restaurant: RestaurantData[]) {
    this._restaurant.next(restaurant);
  }



}
