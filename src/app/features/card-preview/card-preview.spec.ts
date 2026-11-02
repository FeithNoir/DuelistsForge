import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { CardPreview } from './card-preview';

describe('CardPreview', () => {
  async function setup(): Promise<{
    fixture: ReturnType<typeof TestBed.createComponent<CardPreview>>;
    element: HTMLElement;
  }> {
    await TestBed.configureTestingModule({
      imports: [CardPreview],
    }).compileComponents();
    const fixture = TestBed.createComponent(CardPreview);
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('renders the default front and flips with click or keyboard', async () => {
    const { fixture, element } = await setup();
    expect(element.querySelector('.card-title')?.textContent).toContain('Dark Magician');
    expect(element.querySelector('.card')?.classList.contains('is-flipped')).toBe(false);

    element
      .querySelector('.card-container')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    expect(element.querySelector('.card')?.classList.contains('is-flipped')).toBe(true);

    const container = element.querySelector('.card-container');
    container?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(element.querySelector('.card')?.classList.contains('is-flipped')).toBe(false);
    expect(container?.getAttribute('aria-pressed')).toBe('false');
  });
});
