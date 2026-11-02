/** Supported interface languages. English is the initial locale. */
export const LOCALE_IDS = ['en', 'es'] as const;

/** BCP-47-ish id stored by `LocaleService` and written to `<html lang>`. */
export type LocaleId = (typeof LOCALE_IDS)[number];
