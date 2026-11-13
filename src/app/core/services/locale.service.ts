import { computed, Service, signal } from '@angular/core';

import { TRANSLATIONS } from '../data/translations.data';
import type { LocaleId } from '../models/locale.model';

/** Owns the active language. Components read `messages()` and never import catalogs directly. */
@Service()
export class LocaleService {
  readonly locale = signal<LocaleId>('en');
  readonly messages = computed(() => TRANSLATIONS[this.locale()]);

  toggle(): void {
    this.locale.update((current) => (current === 'en' ? 'es' : 'en'));
  }

  setLocale(locale: LocaleId): void {
    this.locale.set(locale);
  }
}
