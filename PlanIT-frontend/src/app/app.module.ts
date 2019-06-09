import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material-module';
import {ChatComponent} from "./pages/chat/chat.component";
import { HttpClientModule } from '@angular/common/http';
import {LoginComponent} from "./pages/login/login.component";
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from "./pages/register/register.component";
import {MatDialogModule} from "@angular/material";
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import {EventsComponent} from "./pages/events/events.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [
    EventDetailsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
