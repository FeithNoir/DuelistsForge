import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-language-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.css',
})
export class LanguageSwitch {
  protected readonly locale = inject(LocaleService);
  protected readonly messages = this.locale.messages;

  protected toggle(): void {
    this.locale.toggle();
  }
}
