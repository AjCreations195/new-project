import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:{name:string,place:string,Designation:string}[]=[]
 
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  fetchUsers(){
    this.userService.fetchUsers()
    .pipe(map(response =>{
      const postsArray = [];
      for(const key in response){
       
          postsArray.push({...response[key],id:key})
       
       
      }
      return postsArray;
    })).subscribe(res=>{
      console.log(res);
          this.user = res 
    })
  }
saveUsers(){
  this.userService.saveUsers().subscribe(res=>{
    console.log(res);
    
  })
}

}
