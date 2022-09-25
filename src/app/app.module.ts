import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CdkListboxModule } from '@angular/cdk/listbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CdkListboxModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
