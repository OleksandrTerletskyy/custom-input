import { Pipe, PipeTransform } from "@angular/core";
// import * as _ from 'lodash';

const PADDING = "000000";

@Pipe({ name: "myCurrency" })
export class CurrencyPipe implements PipeTransform {

  private options = {
        prefix : '',
        decimalSep : ".",
        thousandsSep : ",",
        suffix : ' $'
    };

  transform(value: string, filterOptions:{} = {} ,fractionSize: number = 2): string {
    // let options = {
    //   prefix: filterOptions["prefix"] == "undefined" || this.options.prefix,
    //   decimalSep: filterOptions["decimalSep"] || this.options.decimalSep,
    //   thousandsSep: filterOptions["thousandsSep"] || this.options.thousandsSep,
    //   suffix: filterOptions["suffix"] || this.options.suffix,
    // }
    _.extend(filterOptions, this.options);

    let [ integer, fraction = "" ] = (value || "").toString()
      .split(".");

    fraction = fractionSize > 0
      ? this.options.decimalSep + (fraction + PADDING).substring(0, fractionSize)
      : "";

    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.options.thousandsSep);

    return this.options.prefix + integer + fraction + this.options.suffix;
  }

  parse(value: string, fractionSize: number = 2): string {
    let [ integer, fraction = "" ] = (value || "").replace(this.options.prefix, "")
                                                  .replace(this.options.suffix, "")
                                                  .split(this.options.decimalSep);

    integer = integer.replace(new RegExp(this.options.thousandsSep, "g"), "");

    fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
      ? this.options.decimalSep + (fraction + PADDING).substring(0, fractionSize)
      : "";

    return integer + fraction;
  }

}