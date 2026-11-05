<script lang="ts">
import { asset } from '$app/paths';
import ConfettiBurst from './ConfettiBurst.svelte';
import type { Balloon } from './balloon';

let { balloon, onPop }: {
  balloon: Balloon;
  onPop: (balloon: Balloon) => void;
} = $props();

</script>


<button
  class="balloon {balloon.type} cursor-pointer select-none text-[26px]"
  class:popped={balloon.popped}
  aria-label="Pop balloon"
  style="
    --x: {balloon.x}%;
    --y: {balloon.y}px;
    --rotation: {balloon.rotation}deg;
    --size: {balloon.size}px;
    --background-color: {balloon.color.background};
    --outline-color: {balloon.color.outline}
  "
  onclick={() => onPop(balloon)}
>
  <span class="balloon-art" aria-hidden="true">
    <span class="balloon-prize">
      {#if balloon.inside === 'coin'}<img src={asset('games/pop-pops/coin-icon-3x.png')} alt="" class="w-8" />{/if}
      {#if balloon.inside === 'candy'}<img src={asset('games/pop-pops/candy-icon-3x.png')} alt="" class="w-8" />{/if}
    </span>
    <span class="balloon-body"></span>
    <svg class="balloon-knot" viewBox="0 0 26 20">
      <path d="M9.5 1H16.5L17.8 7.5 22 12.8Q22.8 14 21.2 14.5L13 12.4 4.8 14.5Q3.2 14 4 12.8l4.2-5.3Z" />
    </svg>
  </span>

  {#if balloon.inside === 'confetti' && balloon.popped}
    <ConfettiBurst counterRotation={-balloon.rotation} />
  {/if}
</button>


<style>
.balloon {
  --tap-padding: 12px;
  position: absolute;
  left: var(--x);
  bottom: calc(-1 * var(--tap-padding));
  width: calc(var(--size) + var(--tap-padding) * 2);
  height: calc(var(--size) * 1.25 + var(--tap-padding) * 2);
  transform: translate(-50%, calc(-1 * var(--y))) rotate(var(--rotation));
  border: 0;
  border-radius: 50% 50% 48% 48%;
  background: transparent;
  overflow: visible;
  isolation: isolate;
}

.balloon-art {
  position: absolute;
  inset: var(--tap-padding);
  z-index: -1;
  pointer-events: none;
}

.balloon-body {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: 50% 50% 48% 48%;
  background: var(--background-color);
  opacity: 0.90;
  box-shadow:
    inset 0 0 0 2px var(--outline-color),
    inset -12px -14px 18px rgb(0 0 0 / 5%),
    0 6px 10px rgb(12 68 103 / 5%);
}

.balloon-knot {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: calc(100% - 3px);
  width: 26px;
  height: 20px;
  pointer-events: none;
  transform: translateX(-50%);
}

.balloon-prize {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: grid;
  place-items: center;
  font-size: 26px;
  line-height: 1;
}

.balloon-knot path {
  fill: var(--background-color);
  stroke: var(--outline-color);
  stroke-linejoin: round;
  stroke-width: 2;
}

.balloon.popped {
  pointer-events: none;
  color: transparent;
}

.balloon.popped .balloon-art {
  animation: balloon-pop 240ms cubic-bezier(0.18, 0.78, 0.28, 1) forwards;
}

@keyframes balloon-pop {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  35% {
    transform: scale(0.82, 1.15);
    opacity: 1;
  }

  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

</style>
