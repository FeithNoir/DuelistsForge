import { attributeById } from '../data/attributes.data';
import { PLACEHOLDER_ARTWORK_URL } from '../data/placeholder-art.data';
import { SPELL_GLYPH, TRAP_GLYPH } from '../models/attribute.model';
import { CARD_LEVEL_MAX, type CardDraft } from '../models/card-draft.model';
import { isMonsterFrame } from '../models/card-frame.model';
import type { CardView } from '../models/card-view.model';
import type { Messages } from '../models/messages.model';

const STAR = '★';

/** Keeps the star row inside the badge, even if the number input is briefly out of range. */
export function clampLevel(level: number | null): number {
  if (level === null || !Number.isFinite(level)) {
    return 0;
  }
  return Math.max(0, Math.min(CARD_LEVEL_MAX, Math.trunc(level)));
}

export function starGlyphs(level: number | null): string {
  return STAR.repeat(clampLevel(level));
}

/** Blank fields fall back to the active language so the preview is never an empty card. */
export function displayText(value: string, fallback: string): string {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

export function buildCardView(
  draft: CardDraft,
  artworkUrl: string | null,
  messages: Messages,
): CardView {
  const level = clampLevel(draft.level);
  const monster = isMonsterFrame(draft.frameId);

  if (monster) {
    const attribute = attributeById(draft.attributeId);
    return {
      title: displayText(draft.name, messages.defaultCardName),
      race: displayText(draft.race, messages.defaultCardRace),
      description: displayText(draft.description, messages.defaultCardText),
      frameId: draft.frameId,
      showMonsterStats: true,
      stars: starGlyphs(level),
      level,
      levelAria: messages.levelAria.replace('{level}', String(level)),
      attributeGlyph: attribute.glyph,
      attributeAria: `${messages.attrAria}: ${messages[attribute.labelKey]}`,
      artworkUrl: artworkUrl ?? PLACEHOLDER_ARTWORK_URL,
    };
  }

  const spell = draft.frameId === 'spell';
  return {
    title: displayText(draft.name, messages.defaultCardName),
    race: displayText(draft.race, messages.defaultCardRace),
    description: displayText(draft.description, messages.defaultCardText),
    frameId: draft.frameId,
    showMonsterStats: false,
    stars: starGlyphs(level),
    level,
    levelAria: messages.levelAria.replace('{level}', String(level)),
    attributeGlyph: spell ? SPELL_GLYPH : TRAP_GLYPH,
    attributeAria: spell ? messages.optSpell : messages.optTrap,
    artworkUrl: artworkUrl ?? PLACEHOLDER_ARTWORK_URL,
  };
}
