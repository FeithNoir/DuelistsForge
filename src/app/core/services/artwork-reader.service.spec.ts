import { describe, expect, it } from 'vitest';

import {
  ArtworkReadError,
  ArtworkReaderService,
  MAX_ARTWORK_BYTES,
} from './artwork-reader.service';

describe('ArtworkReaderService', () => {
  const reader = new ArtworkReaderService();

  it('reads an image file as a data URL', async () => {
    const file = new File([new Uint8Array([1, 2, 3, 4])], 'forge.png', { type: 'image/png' });
    const url = await reader.read(file);
    expect(url.startsWith('data:image/png')).toBe(true);
  });

  it('rejects files that are not images', async () => {
    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' });
    await expect(reader.read(file)).rejects.toBeInstanceOf(ArtworkReadError);
    await expect(reader.read(file)).rejects.toMatchObject({ reason: 'type' });
  });

  it('rejects images larger than 5 MB', async () => {
    const file = new File([new Uint8Array(MAX_ARTWORK_BYTES + 1)], 'huge.png', {
      type: 'image/png',
    });
    await expect(reader.read(file)).rejects.toMatchObject({ reason: 'size' });
  });
});
