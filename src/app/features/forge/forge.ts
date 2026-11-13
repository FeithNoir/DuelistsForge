import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';

import { CardExportService } from '../../core/services/card-export.service';
import { CardForgeService } from '../../core/services/card-forge.service';
import { LocaleService } from '../../core/services/locale.service';
import { CardEditor } from '../card-editor/card-editor';
import { CardPreview } from '../card-preview/card-preview';

/** Editor plus live preview. This is the only routed screen. */
@Component({
  selector: 'app-forge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardEditor, CardPreview],
  templateUrl: './forge.html',
  styleUrl: './forge.css',
})
export class ForgePage {
  private readonly preview = viewChild.required(CardPreview);
  private readonly exportService = inject(CardExportService);
  private readonly forge = inject(CardForgeService);

  protected readonly locale = inject(LocaleService);
  protected readonly messages = this.locale.messages;
  protected readonly exporting = signal(false);
  protected readonly exportFailed = signal(false);

  protected async onDownload(): Promise<void> {
    this.exporting.set(true);
    this.exportFailed.set(false);
    try {
      await this.exportService.downloadElement(
        this.preview().captureElement(),
        this.forge.view().title,
      );
    } catch {
      this.exportFailed.set(true);
    } finally {
      this.exporting.set(false);
    }
  }
}
