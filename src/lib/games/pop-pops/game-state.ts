import { persistedStore } from '#lib/state/persisted-store.ts';


export const balloonsPopped = persistedStore(
  'balloon-poppers:balloons-popped',
  0
);

export const candyCollected = persistedStore(
  'balloon-poppers:candy-collected',
  0
);

export const coinsCollected = persistedStore(
  'balloon-poppers:coins-collected',
  0
);
