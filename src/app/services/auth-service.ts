import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Service } from '@angular/core';
import { tap } from 'rxjs';
import { AuthResponse } from '../models/Authresponse';
import { Router } from '@angular/router';

@Service()
export class AuthService {
    private readonly http=inject(HttpClient);
    private readonly router=inject(Router);
    public onLoginEvent=new EventEmitter();


    private apiKey="AIzaSyDUN1UVTmB0kssxbh-IQBCShXjlG5fwJu4"
    public idToken:string="";

    constructor (){
        const tmp=localStorage.getItem("idToken");
        if (tmp!=null){
            this.idToken=tmp;
            this.onLogin(this.idToken);
        }
    }

    private onLogin(idToken:string){
        this.idToken=idToken;
        localStorage.setItem("idToken",idToken);
        this.onLoginEvent.emit();
    } 

    public signUp(email:string, password:string){
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.apiKey, {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe( 
            tap((data)=>{
                this.onLogin(data.idToken);
            })
        );
    }

    public signIn(email:string, password:string){
        return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.apiKey, {
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe( 
            tap((data)=>{
                this.onLogin(data.idToken);
            })
        );
    }

    public isLoggedIn(){
        return this.idToken!="";
    }

    public logout(){
        localStorage.removeItem("idToken");
        this.idToken="";
        this.onLoginEvent.emit();
        this.router.navigate(["/login"]);

    }


}
