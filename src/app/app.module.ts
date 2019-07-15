import {
  MatBadgeModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgModule } from "@angular/core";
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, CartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
