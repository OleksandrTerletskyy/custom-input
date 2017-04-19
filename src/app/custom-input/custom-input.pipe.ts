import { Pipe, PipeTransform } from "@angular/core";
import * as _ from 'lodash';

const PADDING = "000000";

@Pipe({ name: "myCurrency" })
export class CurrencyPipe implements PipeTransform {
  private options = {
        prefix : '',
        decimalSep : ".",
        thousandsSep : ",",
        suffix : ' $'
    };

  transform(value: string, formatOptions: any ,fractionSize: number = 2): string {
    let transformOptions = _.clone(this.options);
    _.extend(transformOptions, formatOptions);
    let [ integer, fraction = "" ] = (value || "").toString()
      .split(".");
    fraction = fractionSize > 0
      ? transformOptions.decimalSep + (fraction + PADDING).substring(0, fractionSize)
      : "";
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, transformOptions.thousandsSep);

    return transformOptions.prefix + integer + fraction + transformOptions.suffix;
  }

  parse(value: string,  formatOptions: any, fractionSize: number = 2): string {
    let transformOptions = _.clone(this.options);
    _.extend(transformOptions, formatOptions);
    let [ integer, fraction = "" ] = (value || "").replace(transformOptions.prefix, "")
                                                  .replace(transformOptions.suffix, "")
                                                  .split(transformOptions.decimalSep);

    integer = integer.replace(new RegExp('\\' + transformOptions.thousandsSep, 'g'), "");
    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? "." + (fraction + PADDING).substring(0, fractionSize)
      : "";

    return integer + fraction;
  }

}