import { NgModule, ModuleWithProviders }     from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { CurrencyPipe } from "./custom-input/custom-input.pipe";
import { CurrencyDirective } from "./custom-input/custom-input.directive";
 
@NgModule({
    imports: [CommonModule, FormsModule],

    declarations: [CurrencyPipe, 
                   CurrencyDirective], 

    exports: [CommonModule, FormsModule, CurrencyDirective, CurrencyPipe ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }

}