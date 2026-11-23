import { Routes } from '@angular/router';
import { ItemsList } from './components/items/items-list/items-list';
import { ItemNew } from './components/items/item-new/item-new';
import { LoginForm } from './components/login-form/login-form';
import { ItemsSearch } from './components/items/items-search/items-search';

export const routes: Routes = [
  {path:"", component:ItemsList},
  {path:"items/new", component:ItemNew},
  {path:"search", component:ItemsSearch},
  {path:"login", component:LoginForm},
];
