import { Service } from '@angular/core';

export const MAX_ARTWORK_BYTES = 5 * 1024 * 1024;

export type ArtworkReadReason = 'type' | 'size' | 'read';

export class ArtworkReadError extends Error {
  constructor(readonly reason: ArtworkReadReason) {
    super(reason);
    this.name = 'ArtworkReadError';
  }
}

/** Reads a local image into a data URL. Rejects non-images and files over 5 MB. */
@Service()
export class ArtworkReaderService {
  read(file: File): Promise<string> {
    if (!file.type.startsWith('image/')) {
      return Promise.reject(new ArtworkReadError('type'));
    }
    if (file.size > MAX_ARTWORK_BYTES) {
      return Promise.reject(new ArtworkReadError('size'));
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
          return;
        }
        reject(new ArtworkReadError('read'));
      };
      reader.onerror = () => {
        reject(new ArtworkReadError('read'));
      };
      reader.readAsDataURL(file);
    });
  }
}
