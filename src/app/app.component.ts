import { Component } from '@angular/core';
import { CurrencyPipe } from "./custom-input/custom-input.pipe";

@Component({
  selector: 'app-root',
  template:  
  `
  <div>
    <input type="text" [(ngModel)]="balanceAmount" [formatOptions]="formatOptions" custom-input/>

    Amount is: {{balanceAmount}}
  </div>
  `
})
export class AppComponent {
  balanceAmount: number;
  formatOptions = {
      prefix : '',
      decimalSep : "*",
      // thousandsSep : "|",
      // suffix : ' €'
  };
  constructor(private mycurpipe: CurrencyPipe) {
    this.balanceAmount = 1234567.89;
  }
}
