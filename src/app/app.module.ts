import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParcelListComponent } from './components/parcel-list/parcel-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParcelCreateComponent } from './components/parcel-create/parcel-create.component';
import { provideHttpClient } from '@angular/common/http';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ParcelEditComponent } from './components/parcel-edit/parcel-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ParcelListComponent,
    ParcelCreateComponent,
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    ParcelEditComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
