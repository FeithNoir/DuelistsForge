import { describe, expect, it } from 'vitest';

import { cardFileName } from './card-file-name';

describe('cardFileName', () => {
  it('slugifies the visible title', () => {
    expect(cardFileName('Dark Magician')).toBe('Dark_Magician_Card.png');
    expect(cardFileName('Mago Oscuro')).toBe('Mago_Oscuro_Card.png');
  });

  it('drops punctuation and falls back when nothing remains', () => {
    expect(cardFileName('***')).toBe('card_Card.png');
    expect(cardFileName('   ')).toBe('card_Card.png');
  });
});
