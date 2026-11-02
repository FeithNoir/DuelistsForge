import { Service } from '@angular/core';

import { cardFileName } from '../card/card-file-name';

/**
 * Captures the card front as a PNG. html2canvas is loaded on demand so the
 * editor stays small until the user actually downloads.
 */
@Service()
export class CardExportService {
  async downloadElement(element: HTMLElement, title: string): Promise<void> {
    const { default: html2canvas } = await import('html2canvas');
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2,
      backgroundColor: null,
    });
    const link = document.createElement('a');
    link.download = cardFileName(title);
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}
