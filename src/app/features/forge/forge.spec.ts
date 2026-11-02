import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { ForgePage } from './forge';

describe('ForgePage', () => {
  it('shows the editor beside the preview', async () => {
    await TestBed.configureTestingModule({
      imports: [ForgePage],
    }).compileComponents();

    const fixture = TestBed.createComponent(ForgePage);
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('aside h2')?.textContent).toContain('Customize Card');
    expect(element.querySelector('#main-content .card-front')).toBeTruthy();
    expect(element.querySelector('.back-title')?.textContent).toContain("Duelist's Forge");
  });
});
