import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { FormField } from '@angular/forms/signals';

import { ATTRIBUTES } from '../../core/data/attributes.data';
import { CARD_FRAMES } from '../../core/data/card-frames.data';
import {
  ArtworkReadError,
  ArtworkReaderService,
  type ArtworkReadReason,
} from '../../core/services/artwork-reader.service';
import { CardForgeService } from '../../core/services/card-forge.service';
import { LocaleService } from '../../core/services/locale.service';
import { FoldSection } from '../../shared/fold-section/fold-section';

@Component({
  selector: 'app-card-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, FoldSection],
  templateUrl: './card-editor.html',
  styleUrl: './card-editor.css',
})
export class CardEditor {
  private readonly artworkReader = inject(ArtworkReaderService);

  protected readonly forge = inject(CardForgeService);
  protected readonly locale = inject(LocaleService);
  protected readonly messages = this.locale.messages;
  protected readonly editor = this.forge.editorForm;
  protected readonly frames = CARD_FRAMES;
  protected readonly attributes = ATTRIBUTES;
  protected readonly artworkIssue = signal<ArtworkReadReason | null>(null);

  readonly exporting = input(false);
  readonly exportFailed = input(false);
  readonly downloadCard = output<void>();

  protected async onArtworkSelected(event: Event): Promise<void> {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }
    const file = event.target.files?.item(0) ?? null;
    event.target.value = '';
    if (!file) {
      return;
    }

    try {
      this.forge.setArtwork(await this.artworkReader.read(file));
      this.artworkIssue.set(null);
    } catch (error: unknown) {
      const reason = error instanceof ArtworkReadError ? error.reason : 'read';
      this.artworkIssue.set(reason);
    }
  }

  protected clearArtwork(): void {
    this.forge.setArtwork(null);
    this.artworkIssue.set(null);
  }

  protected requestDownload(): void {
    this.downloadCard.emit();
  }
}
