import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ProviderComponent } from './provider/provider.component';
import { TerminalComponent } from './terminal/terminal.component';
import { ShopBlockingPipe } from './shop-info/shop-blocking.pipe';
import { ShopSuspensionPipe } from './shop-info/shop-suspension.pipe';
import { ShopInfoComponent } from './shop-info/shop-info.component';
import { ShopDetailsComponent } from './shop-details.component';
import { AddProviderComponent } from './add-provider/add-provider.component';
import { TerminalsTableComponent } from './add-provider/select-terminal/terminals-table/terminals-table.component';
import { CreateTerminalFormComponent } from './add-provider/select-terminal/create-terminal-form/create-terminal-form.component';
import { SelectTerminalComponent } from './add-provider/select-terminal/select-terminal.component';
import { SelectProviderComponent } from './add-provider/select-provider/select-provider.component';
import { IsActivePipe } from './is-active.pipe';
import { CategoryComponent } from './shop-info/category/category.component';
import { SharedModule } from '../../shared/shared.module';
import { EditTerminalDecisionPriorityComponent } from './edit-terminal-decision/edit-terminal-decision-priority/edit-terminal-decision-priority.component';
import { EditTerminalDecisionWeightComponent } from './edit-terminal-decision/edit-terminal-decision-weight/edit-terminal-decision-weight.component';
import { TerminalsComponent } from './terminals/terminals.component';

@NgModule({
    imports: [
        MatExpansionModule,
        MatListModule,
        MatCardModule,
        CommonModule,
        MatProgressSpinnerModule,
        FlexLayoutModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatTableModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,
        MatProgressBarModule,
        MatMenuModule,
        MatProgressBarModule,
        MatChipsModule,
        SharedModule
    ],
    declarations: [
        ShopDetailsComponent,
        ShopBlockingPipe,
        ShopSuspensionPipe,
        ShopInfoComponent,
        ProviderComponent,
        TerminalComponent,
        AddProviderComponent,
        TerminalsTableComponent,
        CreateTerminalFormComponent,
        SelectProviderComponent,
        SelectTerminalComponent,
        IsActivePipe,
        CategoryComponent,
        EditTerminalDecisionPriorityComponent,
        EditTerminalDecisionWeightComponent,
        TerminalsComponent
    ],
    entryComponents: [
        AddProviderComponent,
        EditTerminalDecisionPriorityComponent,
        EditTerminalDecisionWeightComponent
    ]
})
export class ShopDetailsModule {}
