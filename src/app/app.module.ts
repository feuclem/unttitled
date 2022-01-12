import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RosterComponent } from './roster/roster.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "angularx-social-login";

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
        RouterModule.forRoot(appRouteList),
        FormsModule,
        SocialLoginModule
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('189836141315-qr4sg7u5e6837183fep8i7qohme4ts89.apps.googleusercontent.com')
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
