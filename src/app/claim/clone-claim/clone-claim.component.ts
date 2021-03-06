import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { ClaimActionType } from '../claim-action-type';

interface RouteData {
    partyID: string;
    claimID: string;
}

@Component({
    templateUrl: 'clone-claim.component.html'
})
export class CloneClaimComponent {
    constructor(
        private dialogRef: MatDialogRef<CloneClaimComponent>,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) private data: RouteData
    ) {}

    cloneClaim() {
        this.dialogRef.close();
        this.router.navigate([
            `/claims/${this.data.partyID}/${ClaimActionType.create}/${this.data.claimID}`
        ]);
    }
}
