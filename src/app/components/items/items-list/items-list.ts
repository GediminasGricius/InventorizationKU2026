import { Component, signal } from '@angular/core';
import { ItemsService } from '../../../services/items-service';
import { Item } from '../../../models/Item';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-items-list',
  styleUrl: './items-list.css',
  templateUrl: './items-list.html',
})
export class ItemsList {

  public items=signal<Item[]>([]);
  public allItems:Item[]=[];
  public filterName:string='';
  public filterNumber:string='';
  public fiterRoom:string='';

  constructor (private itemsService:ItemsService, private authService:AuthService, private router:Router){

    if (authService.isLoggedIn()){
      itemsService.loadItems().subscribe((data)=>{
        this.allItems=data;
        this.items.set(data);
      });
    }else{
      router.navigate(["/login"]);
    }
  }

  public filter(){
    this.items.set(
      this.allItems.filter((data)=>{
       

        if (this.filterName!="" && !data.name.includes(this.filterName)){
          return false;

        }

        if (this.filterNumber!="" && !data.inv_no.includes(this.filterNumber)){
          return false;
        }

       if (this.fiterRoom!="" && !data.locations.includes(this.fiterRoom)){
          return false;
        } 

        return true;

      })

    );

  }
}
