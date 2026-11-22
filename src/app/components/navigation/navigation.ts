import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-navigation',
  styleUrl: './navigation.css',
  templateUrl: './navigation.html',
})
export class Navigation {

  public isLoggedin=signal<boolean>(false);

  constructor (private authService:AuthService){
    if (authService.isLoggedIn()){
      this.isLoggedin.set(true);
    }

    authService.onLoginEvent.subscribe(()=>{
      this.isLoggedin.set(authService.isLoggedIn());
    });

  }

  public logOut(){
    this.authService.logout();

  }
  
}
