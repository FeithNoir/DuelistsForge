import { computed, inject, Service, signal } from '@angular/core';
import { form } from '@angular/forms/signals';

import { buildCardView } from '../card/build-card-view';
import { EMPTY_CARD_DRAFT, type CardDraft } from '../models/card-draft.model';
import { cardDraftSchema } from '../forms/card-draft.schema';
import { LocaleService } from './locale.service';

/**
 * Single source of truth for the card being forged.
 * The signal form writes into `draft`; `view` is what the preview renders.
 */
@Service()
export class CardForgeService {
  private readonly locale = inject(LocaleService);

  readonly draft = signal<CardDraft>({ ...EMPTY_CARD_DRAFT });
  readonly artworkUrl = signal<string | null>(null);
  readonly editorForm = form(this.draft, cardDraftSchema);
  readonly view = computed(() =>
    buildCardView(this.draft(), this.artworkUrl(), this.locale.messages()),
  );

  setArtwork(url: string | null): void {
    this.artworkUrl.set(url);
  }
}
