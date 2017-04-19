import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared.module'
import { AppComponent } from './app.component';
import { CurrencyPipe } from "./custom-input/custom-input.pipe";


@NgModule({
  imports:      [ BrowserModule, SharedModule],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ],
  providers: [ CurrencyPipe ]
})
export class AppModule { }
