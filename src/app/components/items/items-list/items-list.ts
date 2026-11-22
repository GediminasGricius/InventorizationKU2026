import { Component, signal } from '@angular/core';
import { ItemsService } from '../../../services/items-service';
import { Item } from '../../../models/Item';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-items-list',
  styleUrl: './items-list.css',
  templateUrl: './items-list.html',
})
export class ItemsList {

  public items=signal<Item[]>([]);

  constructor (private itemsService:ItemsService, private authService:AuthService, private router:Router){

    if (authService.isLoggedIn()){
      itemsService.loadItems().subscribe((data)=>{
        this.items.set(data);
      });
    }else{
      router.navigate(["/login"]);
    }
  }
}
