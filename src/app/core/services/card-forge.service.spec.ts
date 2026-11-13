import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { CardForgeService } from './card-forge.service';
import { LocaleService } from './locale.service';

describe('CardForgeService', () => {
  it('projects the draft and hides monster fields for spells', () => {
    TestBed.configureTestingModule({});
    const forge = TestBed.inject(CardForgeService);
    TestBed.flushEffects();

    expect(forge.view().title).toBe('Dark Magician');
    expect(forge.editorForm.level().hidden()).toBe(false);
    expect(forge.editorForm().valid()).toBe(true);

    forge.editorForm.frameId().value.set('spell');
    TestBed.flushEffects();

    expect(forge.draft().frameId).toBe('spell');
    expect(forge.view().showMonsterStats).toBe(false);
    expect(forge.editorForm.level().hidden()).toBe(true);
    expect(forge.editorForm().valid()).toBe(true);
  });

  it('rejects a monster level outside 1-12', () => {
    TestBed.configureTestingModule({});
    const forge = TestBed.inject(CardForgeService);
    TestBed.flushEffects();

    forge.editorForm.level().value.set(0);
    TestBed.flushEffects();
    expect(forge.editorForm.level().valid()).toBe(false);

    forge.editorForm.level().value.set(8);
    TestBed.flushEffects();
    expect(forge.view().stars).toBe('★★★★★★★★');
  });

  it('follows the locale when fields are blank', () => {
    TestBed.configureTestingModule({});
    const forge = TestBed.inject(CardForgeService);
    const locale = TestBed.inject(LocaleService);
    locale.setLocale('es');
    TestBed.flushEffects();
    expect(forge.view().title).toBe('Mago Oscuro');
  });

  it('stores uploaded artwork separately from the form draft', () => {
    TestBed.configureTestingModule({});
    const forge = TestBed.inject(CardForgeService);
    forge.setArtwork('data:image/png;base64,qq');
    TestBed.flushEffects();
    expect(forge.view().artworkUrl).toBe('data:image/png;base64,qq');
    expect(forge.draft().name).toBe('');
  });
});
