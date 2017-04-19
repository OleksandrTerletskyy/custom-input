import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { Pipe, PipeTransform, OnChanges, SimpleChanges, Input, Provider, forwardRef, Renderer } from "@angular/core";
import { CurrencyPipe } from "./custom-input.pipe";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

const CUSTOM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyDirective),
  multi: true
};

@Directive({ 
  selector: "[custom-input]",
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class CurrencyDirective implements OnInit, ControlValueAccessor {
    @HostListener("focus", ["$event.target.value"]) onfocus = (value: any) => {
        this.isFocused = true;
        this.refreshInput();
    }
    @HostListener("blur", ["$event.target.value"]) onblur = (value: any) => {
        this.isFocused = false;
        this.refreshInput();
    }
    @HostListener('input') oninput = () => {
        this.changeValueBackIfNotCorrect();
        this.setNumericValue(parseFloat(this.value), false);
    }
    @HostListener('keydown') keypress = () => {
        if(this.isMatchingPattern(this.value))
        {
            this.lastCorrectValue = this.value;
        }
    };
    changeValueBackIfNotCorrect() {
        if (!this.isMatchingPattern(this.value)) {
            this.value = this.lastCorrectValue;
        }
    }

    // ControlValueAccessor members
    writeValue(value: number): void {
        let normalizedValue = value == null ? 0 : value;
        this.setNumericValue(normalizedValue);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

    private onChange = (_: any) => {};
    private onTouched = () => {};

    private lastCorrectValue: string;
    private el: any;
    private decimalPattern = "^-?[0-9]+(\.[0-9]{0,2})?$";
    @Input() private formatOptions;

    private isFocused: boolean = false;

    constructor(
        private _renderer: Renderer,
        private elementRef: ElementRef,
        private currencyPipe: CurrencyPipe
    ) {
    }

    refreshInput(){
        if(this.isFocused){
            this.value = this.getNumericValue().toString();
            return;
        }
        this.value = this.currencyPipe.transform(this.getNumericValue().toString(), this.formatOptions);
    }

    private numericVal:number;

    setNumericValue(newNumericVal:number, refresh:boolean = true){
        this.numericVal = newNumericVal;
        this.onChange(newNumericVal);
        if(refresh){
            this.refreshInput();
        } 
    }
    getNumericValue(): number{
        return this.numericVal;
    }

    set value(newVal: string){
        this._renderer.setElementProperty(this.el, 'value', newVal);
        // this.onChange(newVal);
    }

    get value(): string{
        return this.el.value;
    }

    ngOnInit() {
        this.el = this.elementRef.nativeElement;
    }

    isMatchingPattern(val: string): boolean {
      return (new RegExp(this.decimalPattern).test(this.value));
    }
}