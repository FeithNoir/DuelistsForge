import { describe, expect, it } from 'vitest';

import { TRANSLATIONS } from '../data/translations.data';
import { PLACEHOLDER_ARTWORK_URL } from '../data/placeholder-art.data';
import { EMPTY_CARD_DRAFT } from '../models/card-draft.model';
import { buildCardView, clampLevel, starGlyphs } from './build-card-view';

describe('buildCardView', () => {
  const en = TRANSLATIONS.en;
  const es = TRANSLATIONS.es;

  it('fills empty monster fields with the active language', () => {
    const view = buildCardView(EMPTY_CARD_DRAFT, null, en);
    expect(view.title).toBe(en.defaultCardName);
    expect(view.race).toBe(en.defaultCardRace);
    expect(view.description).toBe(en.defaultCardText);
    expect(view.showMonsterStats).toBe(true);
    expect(view.stars).toBe('★★★★★★★');
    expect(view.attributeGlyph).toBe('闇');
    expect(view.artworkUrl).toBe(PLACEHOLDER_ARTWORK_URL);
    expect(view.frameId).toBe('monster-effect');
  });

  it('switches the fallback copy when the locale changes', () => {
    const view = buildCardView(EMPTY_CARD_DRAFT, null, es);
    expect(view.title).toBe('Mago Oscuro');
    expect(view.levelAria).toBe('Nivel 7');
  });

  it('uses the typed name and a custom image', () => {
    const view = buildCardView(
      { ...EMPTY_CARD_DRAFT, name: '  Forge Knight  ', attributeId: 'FIRE' },
      'data:image/png;base64,abc',
      en,
    );
    expect(view.title).toBe('Forge Knight');
    expect(view.attributeGlyph).toBe('炎');
    expect(view.attributeAria).toContain('FIRE');
    expect(view.artworkUrl).toBe('data:image/png;base64,abc');
  });

  it('hides monster stats on spell and trap frames', () => {
    const spell = buildCardView({ ...EMPTY_CARD_DRAFT, frameId: 'spell' }, null, en);
    const trap = buildCardView({ ...EMPTY_CARD_DRAFT, frameId: 'trap' }, null, en);
    expect(spell.showMonsterStats).toBe(false);
    expect(spell.attributeGlyph).toBe('魔');
    expect(spell.attributeAria).toBe(en.optSpell);
    expect(trap.attributeGlyph).toBe('罠');
    expect(trap.attributeAria).toBe(en.optTrap);
  });

  it('clamps the star row to 12', () => {
    expect(clampLevel(null)).toBe(0);
    expect(clampLevel(0)).toBe(0);
    expect(clampLevel(12.9)).toBe(12);
    expect(clampLevel(40)).toBe(12);
    expect(starGlyphs(3)).toBe('★★★');
    const view = buildCardView({ ...EMPTY_CARD_DRAFT, level: 99 }, null, en);
    expect(view.level).toBe(12);
    expect(view.stars).toHaveLength(12);
  });
});
