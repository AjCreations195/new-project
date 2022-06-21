import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit , OnDestroy{
  public isExpanded = false;
  private userSub!: Subscription;
  isLoggedIn = false;

  // isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  //   .pipe(
  //     map(result => result.matches),
  //     shareReplay()
  //   );

  constructor(private breakpointObserver: BreakpointObserver,
    private authService:AuthService
    ) {}
  ngOnInit(): void {
  this.userSub =  this.authService.user.subscribe(user =>{
      this.isLoggedIn = !!user;
      
  })
  }

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  onLogout(){
    this.authService.logout()
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
 
}
