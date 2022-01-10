import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RosterComponent } from './roster/roster.component';
import {RouterModule, Routes} from "@angular/router";

export const appRouteList: Routes = [
  {
    path: 'roster',
    component: RosterComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RosterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouteList)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
