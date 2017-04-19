import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { Pipe, PipeTransform, OnChanges, SimpleChanges, Input } from "@angular/core";
import { CurrencyPipe } from "./currency.pipe";

@Directive({ 
  selector: "[myCurrencyFormatter]"
})
export class CurrencyDirective implements OnInit {
  private lastCorrectValue: string;
  private el: any;
  private decimalPattern = "^-?[0-9]+(\.[0-9]{0,2})?$";
  @Input() thousandSeparator: string;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
  }

  ngOnInit() {
    this.el = this.elementRef.nativeElement;
    this.el.value = this.currencyPipe.transform(this.el.value);
  }

  @HostListener('paste') paste = () => this.checkInputCorrect();

  @HostListener('keyup') keyup = () => this.checkInputCorrect();

  @HostListener('keydown') keypress = () => {
    if(this.isMatchingPattern(this.el.value))
    {
      this.lastCorrectValue = this.el.value;
    }
    // this.checkInputCorrect();
  };

  checkInputCorrect() {
    if (!this.isMatchingPattern(this.el.value)) {
      this.el.value = this.lastCorrectValue;
    }
  }

  isMatchingPattern(val: string): boolean {
    return (new RegExp(this.decimalPattern).test(this.el.value));
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value: any) {
    this.el.value = this.currencyPipe.parse(value);
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value: any) {
    this.el.value = this.currencyPipe.transform(value);
  }

}