import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { StatPayment } from '../../thrift-services/damsel/gen-model/merch_stat';
import { i64ToNumber } from '../../shared/i64-to-number';

@Component({
    selector: 'cc-payment-adjustment-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
    @Input()
    payments: StatPayment[] = [];

    @Output()
    changeSelected: EventEmitter<StatPayment[]> = new EventEmitter();

    dataSource: MatTableDataSource<StatPayment> = new MatTableDataSource();

    selection = new SelectionModel<StatPayment>(true, []);

    @ViewChild(MatPaginator, { static: true })
    paginator: MatPaginator;

    cols = ['select', 'revision', 'invoiceId', 'createdAt', 'ownerId', 'shopId'];

    ngOnChanges(changes: SimpleChanges) {
        const { payments } = changes;
        if (payments && payments.currentValue) {
            this.selection.clear();
            this.changeSelected.emit([]);
            this.dataSource.data = payments.currentValue;
        }
    }

    ngOnInit() {
        this.selection.changed.subscribe(e => this.changeSelected.emit(e.source.selected));
        this.dataSource.filterPredicate = ({ domain_revision }, filter) => {
            const number = i64ToNumber(domain_revision.buffer, domain_revision.offset);
            return filter === number.toString();
        };
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        this.selection.clear();
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.selection.select(...this.dataSource.filteredData);
    }

    isAllSelected() {
        return this.selection.selected.length === this.dataSource.filteredData.length;
    }
}
