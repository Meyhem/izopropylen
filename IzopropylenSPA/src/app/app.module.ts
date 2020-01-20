import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AccountEffects } from './effects/account-effects';

import { AppRoutingModule } from './routing.module';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';

import { State, accountReducer, debug } from './reducers';
import { AccountService } from './services/account.service';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot<State>({
      account: accountReducer
    }, { metaReducers: [debug]}),
    EffectsModule.forRoot([AccountEffects])
  ],
  providers: [AccountService],
  bootstrap: [RootComponent]
})
export class AppModule { }
