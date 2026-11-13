import type { Messages } from './messages.model';

/** Monster attributes. Values stay uppercase so saved drafts stay stable across locales. */
export const ATTRIBUTE_IDS = ['DARK', 'LIGHT', 'EARTH', 'WATER', 'FIRE', 'WIND', 'DIVINE'] as const;

export type AttributeId = (typeof ATTRIBUTE_IDS)[number];

/** One attribute: stable id, short glyph drawn on the card, and a translated name. */
export interface AttributeDefinition {
  readonly id: AttributeId;
  readonly glyph: string;
  readonly labelKey: keyof Messages;
}

/** Generic text marks for spell and trap frames. They are characters, not artwork. */
export const SPELL_GLYPH = '魔';
export const TRAP_GLYPH = '罠';
