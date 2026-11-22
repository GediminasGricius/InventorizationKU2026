import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items-service';
import { Router } from '@angular/router';


@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-item-new',
  styleUrl: './item-new.css',
  templateUrl: './item-new.html',
})
export class ItemNew {
  public newItemForm:FormGroup;

  constructor (private itemsService:ItemsService, private router:Router){
    this.newItemForm=new FormGroup({
      'inv_no':new FormControl(null, [ Validators.required, Validators.minLength(6), Validators.maxLength(6), this.validateInvNo], []),
      'name':new FormControl(null, [Validators.required, Validators.minLength(3) ], []),
      'locations':new FormArray([
          new FormControl(null, [Validators.required], []),

      ])
    });
  }

  get locations(){
    return (this.newItemForm.get("locations") as FormArray).controls;
  }

  public addLocationField(){
     (this.newItemForm.get("locations") as FormArray).push(
      new FormControl(null, [Validators.required], [])
     );
  }

  public removeLocationField(){
     (this.newItemForm.get("locations") as FormArray).removeAt(-1);

  }

  public addInventorizationItem(){
    this.itemsService.addItem(this.newItemForm.value).subscribe(()=>{
      this.router.navigate(["/"]);
    });
    
  }

  private validateInvNo(control:FormControl): ValidationErrors | null{
    if ( /^[0-9]*$/.test(control.value)){
     return null;
    }
    return {"error":"Error"};
  }


}
