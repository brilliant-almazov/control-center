import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

import { DomainService } from '../domain.service';
import { Node } from '../tree/model';

@Component({
    templateUrl: 'object.component.html',
    styleUrls: ['../../shared/container.css']
})
export class ObjectComponent implements OnInit {
    node: Node;
    preview = false;

    constructor(private domainService: DomainService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        combineLatest(this.route.paramMap, this.domainService.node$).subscribe(([params]) => {
            const node = this.domainService.getNode(params.get('ref'));
            this.node = node ? node.children[1].children[0] : null;
        });
    }
}
