import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AccountEffects } from './effects/account-effects';
import { AppRoutingModule } from './routing.module';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';

import { State, accountReducer, debug } from './reducers';
import { AccountService } from './services/account.service';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    RootComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot<State>({ account: accountReducer }, { metaReducers: [debug] }),
    EffectsModule.forRoot([AccountEffects]),
    PanelModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [AccountService],
  bootstrap: [RootComponent]
})
export class AppModule { }
