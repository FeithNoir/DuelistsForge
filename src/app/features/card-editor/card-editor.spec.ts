import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { CardForgeService } from '../../core/services/card-forge.service';
import { CardEditor } from './card-editor';

describe('CardEditor', () => {
  it('hides monster specs when the frame is a spell', async () => {
    await TestBed.configureTestingModule({
      imports: [CardEditor],
    }).compileComponents();

    const fixture = TestBed.createComponent(CardEditor);
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('#card-level')).toBeTruthy();

    const forge = TestBed.inject(CardForgeService);
    forge.editorForm.frameId().value.set('trap');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(element.querySelector('#card-level')).toBeNull();
    expect(element.querySelector('#card-name')).toBeTruthy();
    expect(element.querySelector('.download-btn')?.textContent).toContain('Download Card');
  });
});
