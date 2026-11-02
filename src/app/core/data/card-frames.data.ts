import {
  CARD_FRAME_IDS,
  type CardFrameDefinition,
  type CardFrameGroup,
  type CardFrameId,
} from '../models/card-frame.model';
import type { Messages } from '../models/messages.model';

interface FrameDetail {
  readonly labelKey: keyof Messages;
  readonly group: CardFrameGroup;
}

/**
 * Source of truth for card types.
 * Adding a frame means adding an id, a row here, a translation, and a CSS background.
 */
const CARD_FRAME_DETAILS = {
  'monster-normal': { labelKey: 'optMonsterNormal', group: 'monster' },
  'monster-effect': { labelKey: 'optMonsterEffect', group: 'monster' },
  'monster-synchro': { labelKey: 'optMonsterSynchro', group: 'monster' },
  'monster-xyz': { labelKey: 'optMonsterXyz', group: 'monster' },
  'monster-pendulum': { labelKey: 'optMonsterPendulum', group: 'monster' },
  'monster-link': { labelKey: 'optMonsterLink', group: 'monster' },
  spell: { labelKey: 'optSpell', group: 'spell' },
  trap: { labelKey: 'optTrap', group: 'trap' },
} as const satisfies Record<CardFrameId, FrameDetail>;

export const CARD_FRAMES: readonly CardFrameDefinition[] = CARD_FRAME_IDS.map((id) => ({
  id,
  labelKey: CARD_FRAME_DETAILS[id].labelKey,
  group: CARD_FRAME_DETAILS[id].group,
}));
