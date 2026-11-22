import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-login-form',
  styleUrl: './login-form.css',
  templateUrl: './login-form.html',
})
export class LoginForm {

  public isLogin=true;

  public email:string|null=null;
  public password:string|null=null;

  constructor( private authService:AuthService, private router:Router){

  }

  public onLogin(){
    if (this.email!=null && this.password!=null){
      if(this.isLogin){
        this.authService.signIn(this.email,this.password).subscribe(()=>{
          this.router.navigate(["/"]);
        });
      }else{
        this.authService.signUp(this.email,this.password).subscribe(()=>{
          this.router.navigate(["/"]);
        });
      }
    }
  }

}
