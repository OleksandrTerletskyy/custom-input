import { Component } from '@angular/core';
import { CurrencyPipe } from "./custom-input/custom-input.pipe";

@Component({
  selector: 'app-root',
  template:  
  `
  <div>
    <span class="fieldname">Your balance is</span>: {{ balanceAmount | myCurrency }}
    <br/>
    <input type="text" [(ngModel)]="balanceAmount" thousandSeparator="\`" myCurrencyFormatter/>
  </div>
  `
})
export class AppComponent {
  name: string;
  balanceAmount: string;
  constructor(private mycurpipe: CurrencyPipe) {
    this.balanceAmount = this.mycurpipe.transform("567.89");
  }
}
