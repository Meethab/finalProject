import { DataStoreService } from './data-store.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantStoreService {

  constructor(private _http: HttpClient, private datastore: DataStoreService) { }
  //CRUD operation
  //create method
  addRestaurant(data:any) {
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(
      map((res:any) => {
        return res;
      }))    
    }

    //read method
    getRestaurant() {
      return this._http.get<any>("http://localhost:3000/posts").pipe(
        map((res: any) => {
        return res;
      }))
    }

    //update method
    updateRestaurant(data:any, id:number) {
      return this._http.put<any>("http://localhost:3000/posts/"+id, data).pipe(
        map((res:any) => {
          return res;
        }))      
      }

    //delete method
    deleteRestaurant(id:number) {
      return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(
        map((res:any) => {
          return res;
          console.log(res);
        }))
    }


    getAllRestaurantData() {
      this.getRestaurant().subscribe(res => {        
        this.datastore.setRestaurant(res);
      })
    }

    delRestaurantRecord(data:any) {
      this.deleteRestaurant(data.id).subscribe(res => {
        alert("Restaurant Records Deleted successfully.")
        this.getAllRestaurantData();
      })
    }

    getCurrentRecord(id: number) {
      return this._http.get<any>("http://localhost:3000/posts/"+id)
    }

}
