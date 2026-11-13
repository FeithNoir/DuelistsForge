import type { Messages } from './messages.model';

/** Frame ids match the CSS hooks and the prototype's card-type values. */
export const CARD_FRAME_IDS = [
  'monster-normal',
  'monster-effect',
  'monster-synchro',
  'monster-xyz',
  'monster-pendulum',
  'monster-link',
  'spell',
  'trap',
] as const;

export type CardFrameId = (typeof CARD_FRAME_IDS)[number];

export type CardFrameGroup = 'monster' | 'spell' | 'trap';

/** A row in the card-type catalog: id, translated label, and which fields it needs. */
export interface CardFrameDefinition {
  readonly id: CardFrameId;
  readonly labelKey: keyof Messages;
  readonly group: CardFrameGroup;
}

export type MonsterFrameId = Exclude<CardFrameId, 'spell' | 'trap'>;

/** Monster frames show attribute, level, and race. Spell and trap do not. */
export function isMonsterFrame(frameId: CardFrameId): frameId is MonsterFrameId {
  return frameGroup(frameId) === 'monster';
}

export function frameGroup(frameId: CardFrameId): CardFrameGroup {
  if (frameId === 'spell' || frameId === 'trap') {
    return frameId;
  }
  return 'monster';
}
