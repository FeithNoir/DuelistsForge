import { hidden, max, maxLength, min, schema } from '@angular/forms/signals';

import {
  CARD_LEVEL_MAX,
  CARD_LEVEL_MIN,
  CARD_NAME_MAX_LENGTH,
  type CardDraft,
} from '../models/card-draft.model';
import { isMonsterFrame } from '../models/card-frame.model';

/**
 * Rules for the card editor.
 * Monster-only fields are hidden for spell and trap, so they stop affecting validity.
 */
export const cardDraftSchema = schema<CardDraft>((path) => {
  maxLength(path.name, CARD_NAME_MAX_LENGTH);
  min(path.level, CARD_LEVEL_MIN, {
    when: ({ valueOf }) => isMonsterFrame(valueOf(path.frameId)),
  });
  max(path.level, CARD_LEVEL_MAX, {
    when: ({ valueOf }) => isMonsterFrame(valueOf(path.frameId)),
  });
  hidden(path.attributeId, {
    when: ({ valueOf }) => !isMonsterFrame(valueOf(path.frameId)),
  });
  hidden(path.level, {
    when: ({ valueOf }) => !isMonsterFrame(valueOf(path.frameId)),
  });
  hidden(path.race, {
    when: ({ valueOf }) => !isMonsterFrame(valueOf(path.frameId)),
  });
});
