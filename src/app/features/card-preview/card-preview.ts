import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { CardForgeService } from '../../core/services/card-forge.service';
import { LocaleService } from '../../core/services/locale.service';

@Component({
  selector: 'app-card-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-preview.html',
  styleUrl: './card-preview.css',
})
export class CardPreview {
  private readonly frontRef = viewChild.required<ElementRef<HTMLElement>>('front');

  protected readonly forge = inject(CardForgeService);
  protected readonly locale = inject(LocaleService);
  protected readonly messages = this.locale.messages;
  protected readonly view = this.forge.view;
  protected readonly flipped = signal(false);

  protected toggleFlip(): void {
    this.flipped.update((value) => !value);
  }

  protected onPreviewKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleFlip();
    }
  }

  /** Element html2canvas should capture: the front face, ignoring the 3D flip. */
  captureElement(): HTMLElement {
    return this.frontRef().nativeElement;
  }
}
