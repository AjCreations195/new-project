import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user:{name:string,place:string,Designation:string}[]=[]
   users = [
    {name:'Jafff', place:'Angf', Designation:'engcher'}
  ]
  constructor(private http:HttpClient,
    private authService:AuthService) { }

  saveUsers(){
    return this.http.post('https://hrms-d60f4-default-rtdb.firebaseio.com/users.json',this.users)
  }
  fetchUsers(){
  

      return this.http.get<{name:string,place:string,Designation:string}[]>
      ('https://hrms-d60f4-default-rtdb.firebaseio.com/users.json')
    
  }
}
