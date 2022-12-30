import { Component } from '@angular/core';
import { ActivatedRoute, TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/Shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  foods: Food[] = [];
  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute){
    let foodObservable : Observable<Food[]>
    activatedRoute.params.subscribe((params) =>{
      if(params['searchTerm'])
     foodObservable = this.foodService.getAllFoodBySearchTerm(params['searchTerm']);
      else if(params['tag'])
      foodObservable = this.foodService.getAllFoodByTag(params['tag'])
      else
     foodObservable = foodService.getAll();

    foodObservable.subscribe((serverItems)=> {
      this.foods = serverItems;
     })
    })
  }

}
