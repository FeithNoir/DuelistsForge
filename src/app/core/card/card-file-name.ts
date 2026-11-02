/** Download name derived from the visible title. Falls back when the title has no letters or digits. */
export function cardFileName(title: string): string {
  const slug = title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '_')
    .replace(/^_+|_+$/g, '');
  return `${slug || 'card'}_Card.png`;
}
