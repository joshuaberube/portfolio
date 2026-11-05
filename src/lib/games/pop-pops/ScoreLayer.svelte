<script lang="ts">
import { onMount } from 'svelte';
import { balloonsPopped, candyCollected, coinsCollected } from './game-state';
import { asset } from '$app/paths';
import { formatNumber } from '#lib/utils/format-number';

let hydrated = $state(false);

onMount(() => {
  hydrated = true;
});
</script>


{#if hydrated}
  <div class="score-layer z-10 absolute left-4 right-4 text-[32px] font-bold flex flex-row justify-between items-start touch-none select-none pointer-events-none">
    <span class="flex flex-row items-center">
        <img src={asset('games/pop-pops/balloon-icon-3x.png')} alt="" class="w-8 inline shrink-0 mr-1" />
        {formatNumber($balloonsPopped)}
      </span>
    <div class="flex flex-col">
      <span class="flex flex-row items-center">
        <img src={asset('games/pop-pops/candy-icon-3x.png')} alt="" class="w-8 inline shrink-0 mr-1" />
        {formatNumber($candyCollected)}
      </span>
      <span class="flex flex-row items-center">
        <img src={asset('games/pop-pops/coin-icon-3x.png')} alt="" class="w-8 inline shrink-0 mr-1" />
        {formatNumber($coinsCollected)}
      </span>
    </div>
  </div>
{/if}


<style>
  .score-layer {
    top: calc(1rem + env(safe-area-inset-top));
    animation: score-arrival 240ms cubic-bezier(0.18, 0.78, 0.28, 1) both;
  }

  @keyframes score-arrival {
    from {
      opacity: 0;
      transform: translateY(-12px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .score-layer {
      animation: none;
    }
  }
</style>
