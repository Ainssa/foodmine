import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FOODS_URL, FOODS_BY_SEARCH_URL , FOODS_TAGS_URL, FOODS_BY_TAG_URL, FOODS_BY_ID_URL } from '../Shared/models/Constants/Urls';
import { Food } from '../Shared/models/Food';
import { Tag } from '../Shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm) ;
  }

  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodByTag(tag:string): Observable<Food[]>{
   return tag =='All' ?
   this.getAll():
   this.http.get<Food[]>(FOODS_BY_TAG_URL + tag)
  }

  getFoodById(foodId:string):Observable< Food>{
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId)
  }

}
