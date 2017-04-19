import { Component } from '@angular/core';
import { CurrencyPipe } from "./custom-input/custom-input.pipe";

@Component({
  selector: 'app-root',
  template:  
  `
  <div>
    Amount is: {{balanceAmount}}
    <br>
    <input type="text" [(ngModel)]="balanceAmount" [formatOptions]="formatOptions" custom-input/>
    <br>
    <input type="number" step="0.01" [(ngModel)]="balanceAmount">
  </div>
  `
})
export class AppComponent {
  balanceAmount: number;
  formatOptions = {
      prefix : '',
      decimalSep : "*",
      thousandsSep : "|",
      suffix : ' €'
  };
  constructor(private mycurpipe: CurrencyPipe) {
    this.balanceAmount = 1234567.89;
  }
}
