import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';

let nextFoldId = 0;

/** Collapsible fieldset. Core info starts open; monster specs and visuals start closed. */
@Component({
  selector: 'app-fold-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fold-section.html',
  styleUrl: './fold-section.css',
})
export class FoldSection {
  readonly title = input.required<string>();
  readonly startCollapsed = input(false);

  protected readonly collapsed = linkedSignal(() => this.startCollapsed());
  protected readonly panelId = `fold-panel-${nextFoldId++}`;

  protected toggle(): void {
    this.collapsed.update((value) => !value);
  }
}
