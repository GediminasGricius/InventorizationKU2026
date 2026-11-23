import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Item } from '../models/Item';
import { map } from 'rxjs';

@Service()
export class ItemsService {
    private readonly http=inject(HttpClient);
    private readonly apiURL="https://studentslist2026-default-rtdb.europe-west1.firebasedatabase.app/inventorization";

    public loadItems(){
        return this.http.get<{[key:string]:Item}>(this.apiURL+".json").pipe(
            map((data)=>{
                const tmp:Item[]=[];
                for(let id in data){
                    tmp.push({
                        inv_no:data[id].inv_no,
                        locations:data[id].locations,
                        id:id,
                        name:data[id].name
                    })
                }
                return tmp;
            })
        );
    }

    public addItem(item:Item){
        return this.http.post(this.apiURL+".json", item);
    }

    public searchItems(nr:string){
        return this.http.get<{[key:string]:Item}>(this.apiURL+".json?orderBy=\"inv_no\"&equalTo=\""+nr+"\"").pipe(
            map((data)=>{
                const tmp:Item[]=[];
                for(let id in data){
                    tmp.push({
                        inv_no:data[id].inv_no,
                        locations:data[id].locations,
                        id:id,
                        name:data[id].name
                    })
                }
                return tmp;
            })
        );
    }

}
