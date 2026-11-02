import type { CardFrameId } from './card-frame.model';

/** Read-only projection rendered on the card. Built from the draft plus the active locale. */
export interface CardView {
  readonly title: string;
  readonly race: string;
  readonly description: string;
  readonly frameId: CardFrameId;
  readonly showMonsterStats: boolean;
  readonly stars: string;
  readonly level: number;
  readonly levelAria: string;
  readonly attributeGlyph: string;
  readonly attributeAria: string;
  readonly artworkUrl: string;
}
