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
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './routing.module';
import { State, accountReducer, debug } from './reducers';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LayoutComponent } from './components/layout/layout.component';

import { AccountEffects } from './effects/account-effects';
import { AccountService } from './services/account.service';
import { AuthGuardService } from './services/auth.guard';
import { UtilService } from './services/util.service';

const utilService = new UtilService();

@NgModule({
  declarations: [
    RootComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot<State>({
      account: accountReducer
    },
      {
        metaReducers: [debug],
        initialState: { account: { token: utilService.getStoredToken(), error: null } }
      }),
    EffectsModule.forRoot([AccountEffects]),
    PanelModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    MenubarModule
  ],
  providers: [AccountService, MessageService, AuthGuardService, UtilService],
  bootstrap: [RootComponent]
})
export class AppModule { }
