import { Injectable, NgZone, Optional, Inject } from '@angular/core';

import { IEditorOptions, MonacoFile, CodeLensProvider, CompletionProvider } from './model';
import { CODE_LENS_PROVIDERS, COMPLETION_PROVIDERS } from './tokens';
import { CodeLensService } from './providers/code-lens.service';
import { CompletionService } from './providers/completion.service';
import { AbstractMonacoService } from './abstract-monaco.service';

@Injectable()
export class MonacoEditorService extends AbstractMonacoService {
    private file: MonacoFile;

    constructor(
        @Optional()
        @Inject(CODE_LENS_PROVIDERS)
        protected tokenCodeLensProviders: CodeLensProvider[],
        @Optional()
        @Inject(COMPLETION_PROVIDERS)
        protected tokenCompletionProviders: CompletionProvider[],
        protected codeLensService: CodeLensService,
        protected completionService: CompletionService,
        protected zone: NgZone
    ) {
        super(
            zone,
            codeLensService,
            completionService,
            tokenCodeLensProviders,
            tokenCompletionProviders
        );
    }

    open(file: MonacoFile) {
        this.file = file;
        if (!this.editor || !this.file) {
            return;
        }
        this.editor.setModel(this.prepareModel(file));
    }

    protected createEditor(el: HTMLElement, options: IEditorOptions): monaco.editor.IEditor {
        return monaco.editor.create(el, {
            ...options
        });
    }
    protected openFile() {
        if (this.file) {
            this.open(this.file);
        }
    }
}
