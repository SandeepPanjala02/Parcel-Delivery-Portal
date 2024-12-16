import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcelListComponent } from './components/parcel-list/parcel-list.component';
import { ParcelCreateComponent } from './components/parcel-create/parcel-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ParcelEditComponent } from './components/parcel-edit/parcel-edit.component';


const routes: Routes = [
  { path: 'parcel-list',component:ParcelListComponent},
  { path: 'parcel-create',component:ParcelCreateComponent},
  { path: 'parcel-edit/:parcelId',component:ParcelEditComponent},
  { path: 'user-list',component:UserListComponent},
  { path: 'user-create',component:UserCreateComponent},
  { path: 'user-edit/:userId', component:UserEditComponent}

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
