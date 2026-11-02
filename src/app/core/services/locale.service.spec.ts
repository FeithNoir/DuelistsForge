import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  it('starts in English and toggles to Spanish', () => {
    TestBed.configureTestingModule({});
    const locale = TestBed.inject(LocaleService);

    expect(locale.locale()).toBe('en');
    expect(locale.messages().btnDownload).toBe('Download Card');

    locale.toggle();
    expect(locale.locale()).toBe('es');
    expect(locale.messages().btnDownload).toBe('Descargar Carta');

    locale.setLocale('en');
    expect(locale.messages().defaultCardName).toBe('Dark Magician');
  });
});
