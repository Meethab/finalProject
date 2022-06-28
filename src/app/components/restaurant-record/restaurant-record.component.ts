import { RestaurantStoreService } from './../../services/restaurant-store.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStoreService } from 'src/app/services/data-store.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantData } from 'src/app/models/restaurant.interface';

@Component({
  selector: 'app-restaurant-record',
  templateUrl: './restaurant-record.component.html',
  styleUrls: ['./restaurant-record.component.scss']
})
export class RestaurantRecordComponent implements OnInit {
  allRestaurantData : any;
  subscription!: Subscription;
  showModal = false;

  restaurantForm!: FormGroup;
  restaurantObj :RestaurantData = new RestaurantData;
 
  showAdd!:boolean;
  showBtn!:boolean;
  
  constructor(private datastore: DataStoreService, private resService: RestaurantStoreService) { }

  ngOnInit(): void {
    this.restaurantForm = new FormGroup({
      resName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phNo: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      webAdd: new FormControl("", [Validators.required]),
      service: new FormControl("", [Validators.required])      
    })
    
    this.resService.getAllRestaurantData();

    this.subscription = this.datastore.restaurant$.subscribe(restaurants=>{
      this.allRestaurantData = restaurants;
    })
  }

  clickAddRestaurant() {
    this.restaurantForm.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
  

  delRecord(data:any) {
    this.resService.delRestaurantRecord(data);
    this.resService.getAllRestaurantData();
  }

  addRestaurant() {
    this.restaurantObj.name = this.restaurantForm.value.resName;
    this.restaurantObj.email = this.restaurantForm.value.email;
    this.restaurantObj.phone = this.restaurantForm.value.phNo;
    this.restaurantObj.address = this.restaurantForm.value.address;
    this.restaurantObj.website = this.restaurantForm.value.webAdd;
    this.restaurantObj.service = this.restaurantForm.value.service;

    this.resService.addRestaurant(this.restaurantObj).subscribe(
      res=> {
        
        alert("Restaurant records added successfully");
        
        let ref = document.getElementById('clear');
        ref?.click();
        this.restaurantForm.reset();
        
        this.resService.getAllRestaurantData();
      },
      err=> {
        alert("Something wrong!")
      })
    
  }

  onEditRestorant(data:any) {
    this.showAdd = false;
    this.showBtn = true;
    this.restaurantObj.id = data.id;
    this.restaurantForm.controls['resName'].setValue(data.name);    
    this.restaurantForm.controls['email'].setValue(data.email);
    this.restaurantForm.controls['phNo'].setValue(data.phone);
    this.restaurantForm.controls['address'].setValue(data.address);
    this.restaurantForm.controls['webAdd'].setValue(data.website);
    this.restaurantForm.controls['service'].setValue(data.service);

  }

  updateRestaurant(){

    this.restaurantObj.name = this.restaurantForm.value.resName;
    this.restaurantObj.email = this.restaurantForm.value.email;
    this.restaurantObj.phone = this.restaurantForm.value.phNo;
    this.restaurantObj.address = this.restaurantForm.value.address;
    this.restaurantObj.website = this.restaurantForm.value.webAdd;
    this.restaurantObj.service = this.restaurantForm.value.service;

    this.resService.updateRestaurant(this.restaurantObj, this.restaurantObj.id).subscribe(
      res=> {
        
        alert("Restaurant records updated successfully");
        
        let ref = document.getElementById('Clear');
        ref?.click();
        this.restaurantForm.reset();
        
        this.resService.getAllRestaurantData();
      },
      err=> {
        alert("Something wrong!")
      })
  }

  clearForm() {
    this.restaurantForm.setValue({resName:'', email:'', phNo:0, address:'', webAdd:'', service:''})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
