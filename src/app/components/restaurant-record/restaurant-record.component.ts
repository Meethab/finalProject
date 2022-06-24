import { RestaurantStoreService } from './../../services/restaurant-store.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStoreService } from 'src/app/services/data-store.service';

@Component({
  selector: 'app-restaurant-record',
  templateUrl: './restaurant-record.component.html',
  styleUrls: ['./restaurant-record.component.scss']
})
export class RestaurantRecordComponent implements OnInit {
  allRestaurantData : any;
  subscription!: Subscription;
  showModal = false;

  constructor(private datastore: DataStoreService, private resService: RestaurantStoreService) { }

  ngOnInit(): void {
    this.resService.getAllRestaurantData();

    this.subscription = this.datastore.restaurant$.subscribe(restaurants=>{
      this.allRestaurantData = restaurants;
    })
  }

  openAddRestaurant() {
    
    this.showModal = true;
  }

  

  delRecord(data:any) {
    this.resService.delRestaurantRecord(data);
    this.resService.getAllRestaurantData();
  }

  getEditdata(data:any) {
  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
