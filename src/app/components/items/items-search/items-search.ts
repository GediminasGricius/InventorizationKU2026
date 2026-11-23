import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemsService } from '../../../services/items-service';
import { Item } from '../../../models/Item';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-items-search',
  styleUrl: './items-search.css',
  templateUrl: './items-search.html',
})
export class ItemsSearch {

  public itemNumber:string="";

  public items=signal<Item[]>([]);

  constructor (private itemsService:ItemsService){

  }

  public search(){
    this.itemsService.searchItems(this.itemNumber).subscribe((data)=>{
      this.items.set(data);
    })
  }



}
