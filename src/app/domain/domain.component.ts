import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DomainService, Node } from './domain.service';

@Component({
    templateUrl: 'domain.component.html',
    styleUrls: ['../shared/container.css', 'domain.component.css']
})
export class DomainComponent implements OnInit {
    data$: Observable<Node[]>;

    constructor(private domainService: DomainService) {
        this.data$ = this.domainService.dataChange;
    }

    ngOnInit() {
        this.domainService.checkout();
    }
}
