<script lang="ts">
import { onMount } from 'svelte';
import { Balloon } from './balloon';
import BalloonView from './Balloon.svelte';
import { balloonsPopped, candyCollected, coinsCollected } from './game-state';

let balloons: Balloon[] = [];
let lastFrame = 0;
let spawnTimer = 0;

const MAX_ACTIVE_BALLOONS = 18;

function handlePopped(balloon: Balloon) {
  if (!balloon.pop()) return;

  balloonsPopped.update(count => count + 1);

  if (balloon.inside === 'coin') {
    coinsCollected.update(count => count + 1);
  }

  if (balloon.inside === 'candy') {
    candyCollected.update(count => count + 1);
  }

  // Reassign so BalloonView sees the new `popped` state immediately.
  balloons = [...balloons];

  // Keep popped balloons mounted long enough for their animation to finish.
  const removalDelay = balloon.inside === 'confetti' ? 1200 : 260;

  window.setTimeout(() => {
    balloons = balloons.filter(item => item.id !== balloon.id);
  }, removalDelay);
}

onMount(() => {
  let frameId: number | undefined;

  function stop() {
    if (frameId !== undefined) cancelAnimationFrame(frameId);
    frameId = undefined;
  }

  function animate(now: number) {
    frameId = undefined;
    const elapsed = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;
    spawnTimer += elapsed;

    if (spawnTimer > 0.65) {
      if (balloons.length < MAX_ACTIVE_BALLOONS) {
        balloons = [...balloons, new Balloon()];
      }
      spawnTimer = 0;
    }

    for (const balloon of balloons) {
      balloon.move(elapsed);
    }

    // Reassign so Svelte updates the views after class instances mutate.
    balloons = balloons.filter((balloon) => !balloon.isOffScreen);

    frameId = requestAnimationFrame(animate);
  }

  function start() {
    lastFrame = performance.now();
    frameId = requestAnimationFrame(animate);
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      stop();
      return;
    }

    start();
  }

  start();
  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    stop();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
});
</script>


<div class="balloon-layer">
  {#each balloons as balloon (balloon.id)}
    <BalloonView {balloon} onPop={handlePopped} />
  {/each}
</div>


<style>
.balloon-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  contain: layout paint;
}
</style>
