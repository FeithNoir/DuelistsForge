import { describe, expect, it } from 'vitest';

import { ATTRIBUTE_IDS } from '../models/attribute.model';
import { CARD_FRAME_IDS } from '../models/card-frame.model';
import { LOCALE_IDS } from '../models/locale.model';
import { ATTRIBUTES } from './attributes.data';
import { CARD_FRAMES } from './card-frames.data';
import { TRANSLATIONS } from './translations.data';

describe('catalogs', () => {
  it('lists every frame and attribute exactly once', () => {
    expect(CARD_FRAMES.map((frame) => frame.id)).toEqual([...CARD_FRAME_IDS]);
    expect(ATTRIBUTES.map((attribute) => attribute.id)).toEqual([...ATTRIBUTE_IDS]);
    expect(new Set(ATTRIBUTES.map((attribute) => attribute.glyph)).size).toBe(ATTRIBUTES.length);
  });

  it('gives every locale the same message keys and no blank copy', () => {
    const [firstLocale, ...rest] = LOCALE_IDS;
    const expected = Object.keys(TRANSLATIONS[firstLocale]).sort();
    for (const locale of rest) {
      expect(Object.keys(TRANSLATIONS[locale]).sort()).toEqual(expected);
    }
    for (const locale of LOCALE_IDS) {
      expect(Object.values(TRANSLATIONS[locale]).every((value) => value.trim().length > 0)).toBe(
        true,
      );
    }
  });
});
