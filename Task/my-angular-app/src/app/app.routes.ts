import { Routes } from '@angular/router';
import { RegionComponent } from './region/region.component';
import { StoreComponent } from './store/store.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegionDetailsComponent } from './region-details/region-details.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path:' ',component:AppComponent},
    {path:'region',component:RegionComponent},
    {path:'region/:id',component:RegionDetailsComponent},
    {path:'store',component:StoreComponent},
    {path:'store/:id',component:StoreDetailsComponent},
    {path:'user',component:UsersComponent},
    {path:'user/:id',component:UserDetailsComponent},
    { path: '**', redirectTo: 'navbar', pathMatch: 'full' }  // Redirect to 'navbar' for undefined routes
];
