import { RestaurantData } from './../models/restaurant.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private _restaurant: BehaviorSubject<RestaurantData[] | any> = new BehaviorSubject(null);
  restaurant$: Observable<RestaurantData[]> = this._restaurant.asObservable();
  
  private fullRestaurantList!: RestaurantData[]

  restauranteditObj :RestaurantData = new RestaurantData;
  
  constructor() { }

  setFullRestaurantList(restaurants: RestaurantData[]) {
    this.fullRestaurantList = restaurants;
  }

  setRestaurants(restaurants: RestaurantData[]) {
    this._restaurant.next(restaurants);
  }

  filterRestaurants(text: string) {
    this._restaurant.pipe(
      take(1)
    ).subscribe(restaurants => {
      if (text === "") {
        this._restaurant.next(this.fullRestaurantList);
        
      } else {
        const filteredRestaurant = restaurants.filter((restaurant: RestaurantData) => {
          const lowerCaseText = text.toLowerCase();
          const restaurantName = restaurant.name.toLowerCase();
          return restaurantName.includes(lowerCaseText)
        })

        this._restaurant.next(filteredRestaurant);
      }
    })
  }
  


}
