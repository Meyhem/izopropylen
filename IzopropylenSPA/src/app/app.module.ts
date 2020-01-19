import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';

import { State, loginReducer, debug } from './reducers';

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<State>({
      login: loginReducer
    }, { metaReducers: [debug]})
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
