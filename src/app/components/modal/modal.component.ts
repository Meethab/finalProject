import { RestaurantStoreService } from './../../services/restaurant-store.service';
import { DataStoreService } from './../../services/data-store.service';
import { RestaurantData } from './../../models/restaurant.interface';
import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  
  restaurantForm!: FormGroup;
  restaurantObj :RestaurantData = new RestaurantData;

  constructor(private resService: RestaurantStoreService, private datastore: DataStoreService,
    private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurantForm = new FormGroup({
      resName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phNo: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      webAdd: new FormControl("", [Validators.required]),
      service: new FormControl("", [Validators.required])      
    })
   
    //this.onEditRestorant(data);

    const id = this.router.snapshot.params['id'];
    if(id) {

      this.resService.getCurrentRecord(id).subscribe(res=>{
       
    
        console.log(res);
        setTimeout(() => {
          this.restaurantForm.patchValue({
            resName: res.name,
            email: res.email,
            phNo: res.phone,
            address: res.address,
            webAdd: res.website,
            service: res.service
          })
          console.log(this.restaurantForm.value);
        }, 1000)
        //this.onEditRestorant(res);
        
       
        setTimeout(() => {
          this.restaurantForm.get("resName")?.setValue("name")
        },2000)
        
        // this.restaurantForm = new FormGroup({
        //   resName: new FormControl(res['name']),
  
        //   email: new FormControl(res['email']),
        //   phNo: new FormControl(res['phone']),
        //   address: new FormControl(res['address']),
        //   webAdd: new FormControl(res['website']),
        //   service: new FormControl(res['service'])     
        // })
     
      }) 
    }
    
    
  }

  onEditRestorant(data:any) {
    //this.restaurantObj.id = data.id;
    console.log(data);
    this.restaurantForm.controls
    this.restaurantForm.controls['resName'].setValue(data.name);    
    this.restaurantForm.controls['email'].setValue(data.email);
    this.restaurantForm.controls['phNo'].setValue(data.phone);
    this.restaurantForm.controls['address'].setValue(data.address);
    this.restaurantForm.controls['webAdd'].setValue(data.website);
    this.restaurantForm.controls['service'].setValue(data.service);

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
  

  updateRestorant(){

    this.restaurantObj.name = this.restaurantForm.value.resName;
    this.restaurantObj.email = this.restaurantForm.value.email;
    this.restaurantObj.phone = this.restaurantForm.value.phNo;
    this.restaurantObj.address = this.restaurantForm.value.address;
    this.restaurantObj.website = this.restaurantForm.value.webAdd;
    this.restaurantObj.service = this.restaurantForm.value.service;

    this.resService.updateRestaurant(this.restaurantObj, this.restaurantObj.id).subscribe(
      res=> {
        
        alert("Restaurant records updated successfully");
        
        let ref = document.getElementById('clear');
        ref?.click();
        this.restaurantForm.reset();
        
        this.resService.getAllRestaurantData();
      },
      err=> {
        alert("Something wrong!")
      })
  }
}
