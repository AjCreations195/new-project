import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User |null >(null);
  private tokenExpirationTimer :any;
  
  constructor(private http: HttpClient, private router:Router) { }

  logIn(email: string, password: string) {
    console.log(email, password);
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAf2GAJQagsFIoe79WAmnCIIUGBjqS4kKI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }),
        catchError(this.handleError)
        // catchError(errorRes => {
        //   console.log(errorRes);

        //   // let errorMessage = 'An unknown error occured';
        //   // if (!errorRes.error || !errorRes.error.error) {
        //   //   return (errorMessage)
        //   // }
        //   // switch (errorRes.error.error.message) {
        //   //   case 'EMAIL_NOT_FOUND':
        //   //     errorMessage = 'This email does not exists'
        //   //     break;
        //   //     case 'INVALID_PASSWORD':
        //   //       errorMessage = 'The password you entered is incorrect';
        //   //       break;
        //   // }
        //   // return throwError(errorMessage)
        // })
      )
  };

  autoLogin(){ 
    const userData:
    {
      email:string;
      id:string;
      _token:string;
      _tokenExpirationDate:string;
    } = JSON.parse(localStorage.getItem('userData')  || '{}')
    if(!userData){
      return ;
    }
    const loadedUser = new User
    (userData.email,userData.id,userData._token, new Date(userData._tokenExpirationDate));

    if(loadedUser.token){

      this.user.next(loadedUser);
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      this.autoLogout(expirationDuration)

    }

  }

  logout(){
    this.user.next(null)
    this.router.navigate(['auth']);
    localStorage.removeItem('userData')
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration:number){
    console.log(expirationDuration);
    
    this.tokenExpirationTimer =  setTimeout(()=>{
        this.logout()
      },expirationDuration)
  }


  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    )
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData',JSON.stringify(user))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return (errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists'
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password you entered is incorrect';
        break;
    }
    return throwError(errorMessage)
  }
}
