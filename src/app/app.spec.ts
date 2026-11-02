import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { describe, expect, it } from 'vitest';

import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  it('renders the forge shell and switches language', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();

    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await router.navigateByUrl('/');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain("Duelist's Forge");
    expect(compiled.querySelector('#card-name')).toBeTruthy();
    expect(document.documentElement.lang).toBe('en');

    const toggle = compiled.querySelector('.lang-btn');
    if (!(toggle instanceof HTMLButtonElement)) {
      throw new Error('Language switch was not rendered');
    }
    toggle.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compiled.querySelector('h1')?.textContent).toContain('Forjador');
    expect(document.documentElement.lang).toBe('es');
  });
});
