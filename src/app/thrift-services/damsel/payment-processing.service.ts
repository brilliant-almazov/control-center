import { Injectable, NgZone } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { share, switchMap, first } from 'rxjs/operators';

import {
    InvoicePaymentAdjustmentParams as InvoicePaymentAdjustmentParamsObject,
    UserInfo as UserInfoObject,
    InvoiceRepairScenario as InvoiceRepairScenarioObject
} from './gen-nodejs/payment_processing_types';
import { ThriftService } from '../thrift-service';
import * as Invoicing from './gen-nodejs/Invoicing';
import { InvoiceID } from './gen-model/domain';
import {
    InvoicePaymentAdjustment,
    InvoicePaymentAdjustmentParams,
    InvoiceRepairScenario,
    UserInfo
} from './gen-model/payment_processing';
import { KeycloakTokenInfoService } from '../../keycloak-token-info.service';

@Injectable()
export class PaymentProcessingService extends ThriftService {
    constructor(zone: NgZone, keycloakTokenInfoService: KeycloakTokenInfoService) {
        super(zone, keycloakTokenInfoService, '/v1/processing/invoicing', Invoicing);
    }

    getPaymentAdjustment = (
        user: UserInfo,
        id: string,
        paymentId: string,
        paymentAdjustmentId: string
    ): Observable<InvoicePaymentAdjustment> =>
        this.toObservableAction('GetPaymentAdjustment')(
            new UserInfoObject(user),
            id,
            paymentId,
            paymentAdjustmentId
        );

    createPaymentAdjustment = (
        user: UserInfo,
        id: string,
        paymentId: string,
        params: InvoicePaymentAdjustmentParams
    ): Observable<InvoicePaymentAdjustment> =>
        this.toObservableAction('CreatePaymentAdjustment')(
            new UserInfoObject(user),
            id,
            paymentId,
            new InvoicePaymentAdjustmentParamsObject(params)
        ).pipe(
            switchMap((paymentAdjustment: InvoicePaymentAdjustment) =>
                timer(1000, 2500).pipe(
                    switchMap(() =>
                        this.getPaymentAdjustment(user, id, paymentId, paymentAdjustment.id)
                    ),
                    first(({ status }: InvoicePaymentAdjustment) => !status.pending)
                )
            ),
            share()
        );

    capturePaymentAdjustment = (
        user: UserInfo,
        id: string,
        paymentId: string,
        adjustmentId: string
    ): Observable<void> =>
        this.toObservableAction('CapturePaymentAdjustment')(
            new UserInfoObject(user),
            id,
            paymentId,
            adjustmentId
        );

    cancelPaymentAdjustment = (
        user: UserInfo,
        id: string,
        paymentId: string,
        adjustmentId: string
    ): Observable<void> =>
        this.toObservableAction('CancelPaymentAdjustment')(
            new UserInfoObject(user),
            id,
            paymentId,
            adjustmentId
        );

    repairWithScenario = (
        user: UserInfo,
        id: InvoiceID,
        scenario: InvoiceRepairScenario
    ): Observable<void> =>
        this.toObservableAction('RepairWithScenario')(
            new UserInfoObject(user),
            id,
            new InvoiceRepairScenarioObject(scenario)
        );
}
