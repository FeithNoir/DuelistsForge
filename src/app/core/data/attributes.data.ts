import {
  ATTRIBUTE_IDS,
  type AttributeDefinition,
  type AttributeId,
} from '../models/attribute.model';
import type { Messages } from '../models/messages.model';

/** Short glyphs drawn inside the attribute badge. They are text, not image assets. */
const ATTRIBUTE_GLYPHS = {
  DARK: '闇',
  LIGHT: '光',
  EARTH: '地',
  WATER: '水',
  FIRE: '炎',
  WIND: '風',
  DIVINE: '神',
} as const satisfies Record<AttributeId, string>;

const ATTRIBUTE_LABELS = {
  DARK: 'attrDark',
  LIGHT: 'attrLight',
  EARTH: 'attrEarth',
  WATER: 'attrWater',
  FIRE: 'attrFire',
  WIND: 'attrWind',
  DIVINE: 'attrDivine',
} as const satisfies Record<AttributeId, keyof Messages>;

export const ATTRIBUTES: readonly AttributeDefinition[] = ATTRIBUTE_IDS.map((id) => ({
  id,
  glyph: ATTRIBUTE_GLYPHS[id],
  labelKey: ATTRIBUTE_LABELS[id],
}));

export function attributeById(id: AttributeId): AttributeDefinition {
  const found = ATTRIBUTES.find((attribute) => attribute.id === id);
  if (!found) {
    throw new Error(`Unknown attribute: ${id}`);
  }
  return found;
}
