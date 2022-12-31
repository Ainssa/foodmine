import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../Shared/interfaces/IUserLogin';
import { USER_LOGIN_URL } from '../Shared/models/Constants/Urls';
import { User } from '../Shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor( private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable(); //work on userObservable to expose
  }
  //create un interface : need to pass the body on the server
  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next:(user) => {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.toastrService.success(
              `Welcome to foodmine ${user.name}!`,
              `login Successful`
            )
        }, error: (errorResponse)=> {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
  );}

  //logout method
  logout(){
    this.userSubject.next(new User()); // new user = empty user
    localStorage.removeItem(USER_KEY); // remove last user information
    window.location.reload(); //refresh pages
  }

  //store user info to not logout after refresh session
    private setUserToLocalStorage(user:User){
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    private getUserFromLocalStorage():User{
      const userJson = localStorage.getItem(USER_KEY);
      if(userJson) return JSON.parse(userJson) as User;
      return new User();
    }
}
