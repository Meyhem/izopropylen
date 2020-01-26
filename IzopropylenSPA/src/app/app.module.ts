import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { AccountEffects } from './effects/account-effects';
import { AppRoutingModule } from './routing.module';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { State, accountReducer, debug } from './reducers';
import { AccountService } from './services/account.service';


@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    MessagesModule,
    MessageModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
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
