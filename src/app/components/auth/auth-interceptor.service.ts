import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return  this.authService.user.pipe(take(1),exhaustMap((user:any)=>{

            if(!user){
                return next.handle(req);
            }
            const modifiedReq= req.clone({
                withCredentials: true,
              })
            // ({ params:new HttpParams().set('auth',user.token)});

            return next.handle(modifiedReq) 
        }))

     
        // throw new Error("Method not implemented.");
    }

}