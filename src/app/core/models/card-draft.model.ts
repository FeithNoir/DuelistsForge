import type { AttributeId } from './attribute.model';
import type { CardFrameId } from './card-frame.model';

/** Limits shared by the signal-form schema and the native input attributes. */
export const CARD_NAME_MAX_LENGTH = 30;
export const CARD_LEVEL_MIN = 1;
export const CARD_LEVEL_MAX = 12;

/**
 * Editable card fields.
 * Empty strings mean "use the localized placeholder" on the preview.
 * Artwork is stored separately because it is a data URL, not a form field.
 */
export interface CardDraft {
  name: string;
  frameId: CardFrameId;
  attributeId: AttributeId;
  level: number | null;
  race: string;
  description: string;
}

export const EMPTY_CARD_DRAFT: CardDraft = {
  name: '',
  frameId: 'monster-effect',
  attributeId: 'DARK',
  level: 7,
  race: '',
  description: '',
};
