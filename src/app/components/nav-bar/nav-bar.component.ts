import { RestaurantStoreService } from './../../services/restaurant-store.service';
import { DataStoreService } from './../../services/data-store.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input() title = '';

  showAdd!:boolean;
  showBtn!:boolean;
  restaurantArr: any; 

  constructor(private resService: RestaurantStoreService, private dataStore: DataStoreService) { }

  ngOnInit(): void {
    this.showAdd = true;

    this.restaurantArr = this.resService.getRestaurant().subscribe(
      res =>{
        this.restaurantArr = res; 
        
      });
  }

  clickAddRestaurant() {
   // this.restaurantForm.reset();
    this.showAdd = true;
    this.showBtn = false;
  }

  onSearch(text: any) {
    this.dataStore.filterRestaurants(text);    
  }
}
