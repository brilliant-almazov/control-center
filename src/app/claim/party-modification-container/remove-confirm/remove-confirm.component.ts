import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ClaimService } from '../../claim.service';

interface RemoveData {
    typeHash: string;
}

@Component({
    templateUrl: 'remove-confirm.component.html'
})
export class RemoveConfirmComponent {
    constructor(
        private dialogRef: MatDialogRef<RemoveConfirmComponent>,
        private claimService: ClaimService,
        @Inject(MAT_DIALOG_DATA) private data: RemoveData
    ) {}

    remove() {
        this.dialogRef.close();
        this.claimService.removeModification(this.data.typeHash);
    }
}
