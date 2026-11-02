import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LocaleService } from './core/services/locale.service';
import { LanguageSwitch } from './shared/language-switch/language-switch';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, LanguageSwitch],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly locale = inject(LocaleService);
  protected readonly messages = this.locale.messages;

  constructor() {
    effect(() => {
      document.title = this.messages().pageTitle;
      document.documentElement.lang = this.locale.locale();
    });
  }
}
