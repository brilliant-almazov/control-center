import { NgModule } from '@angular/core';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { CurrencyPipe } from './pipes/currency.pipe';
import { FormatAmountPipe } from './pipes/format-amount.pipe';
import { ThriftEncodePipe } from './thrift-encode.pipe';
import { ThriftJsonComponent } from './components/thrift-json.component';

@NgModule({
    imports: [
        PrettyJsonModule
    ],
    declarations: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe,
        ThriftJsonComponent
    ],
    exports: [
        CurrencyPipe,
        FormatAmountPipe,
        ThriftEncodePipe,
        ThriftJsonComponent
    ],
})
export class SharedModule {}
