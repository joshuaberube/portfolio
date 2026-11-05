<script lang="ts">
  let { counterRotation }: { counterRotation: number } = $props();

  const colors = ['#ff5d8f', '#ffc64b', '#7f6cff', '#44c8a5', '#64b5ff'] as const;

  function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min);
  }

  function randomItem<T>(items: readonly T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }

  function createPieces() {
    const count = Math.floor(randomBetween(10, 19));

    return Array.from({ length: count }, () => {
      const angle = randomBetween(0, Math.PI * 2);
      const distance = randomBetween(38, 76);

      return {
        x: Math.cos(angle) * distance,
        burstY: Math.sin(angle) * distance,
        fallY: randomBetween(84, 128),
        color: randomItem(colors),
        rotation: randomBetween(-240, 240),
        delay: randomBetween(0, 80)
      };
    });
  }

  const pieces = createPieces();
</script>

<span
  class="confetti-burst"
  style="--counter-rotation: {counterRotation}deg;"
  aria-hidden="true"
>
  {#each pieces as piece}
    <span
      class="confetti-piece"
      style="
        --end-x: {piece.x}px;
        --burst-y: {piece.burstY}px;
        --fall-y: {piece.fallY}px;
        --color: {piece.color};
        --rotation: {piece.rotation}deg;
        --delay: {piece.delay}ms;
      "
    >
      <span class="confetti-shape"></span>
    </span>
  {/each}
</span>

<style>
  .confetti-burst {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    pointer-events: none;
    transform: rotate(var(--counter-rotation));
  }

  .confetti-piece {
    position: absolute;
    width: 0;
    height: 0;
    animation: confetti-burst 380ms cubic-bezier(0.18, 0.74, 0.32, 1) forwards;
    animation-delay: var(--delay);
  }

  .confetti-shape {
    display: block;
    width: 7px;
    height: 11px;
    background: var(--color);
    opacity: 0;
    animation: confetti-fall 1050ms linear forwards;
    animation-delay: var(--delay);
  }

  @keyframes confetti-burst {
    from {
      transform: translate(0, 0);
    }

    to {
      transform: translate(var(--end-x), var(--burst-y));
    }
  }

  @keyframes confetti-fall {
    0% {
      transform: translate(-50%, -50%) translateY(0) rotate(0deg) scale(0.4);
      opacity: 1;
    }

    100% {
      transform: translate(-50%, calc(-50% + var(--fall-y))) rotate(var(--rotation)) scale(0.9);
      opacity: 0;
    }
  }
</style>
