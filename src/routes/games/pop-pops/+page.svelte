<svelte:head>
  <title>Pop Pops</title>
  <meta name="description" content="Pop pops is a game of popping balloons! Collect candy and coins that are hidden in some balloons! This is still in progress." />
  <link rel="icon" type="image/png" href={asset('favicon-pop-pops.png')} />
  <link rel="manifest" href={asset('manifest.webmanifest')} />
  <link rel="apple-touch-icon" href={asset('favicon-pop-pops.png')} />
  <meta name="theme-color" content="#74c9ff" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="Pop Pops" />
</svelte:head>

<main bind:this={gameElement} class="relative isolate min-h-dvh touch-none overflow-hidden bg-sky-100">
  <SkyBackground />

  <div class="relative z-10 min-h-dvh">
    <ScoreLayer />
    <BalloonLayer />
  </div>
</main>


<script lang="ts">
import { asset } from '$app/paths';
import { onMount } from 'svelte';
import BalloonLayer from '#lib/games/pop-pops/BalloonLayer.svelte';
import ScoreLayer from '#lib/games/pop-pops/ScoreLayer.svelte';
import SkyBackground from '#lib/games/pop-pops/SkyBackground.svelte';

let gameElement: HTMLElement;

onMount(() => {
  function preventPinchZoom(event: TouchEvent) {
    if (event.touches.length > 1) event.preventDefault();
  }

  function preventLegacyGesture(event: Event) {
    event.preventDefault();
  }

  gameElement.addEventListener('touchmove', preventPinchZoom, { passive: false });
  window.addEventListener('gesturestart', preventLegacyGesture, { passive: false });
  window.addEventListener('gesturechange', preventLegacyGesture, { passive: false });
  window.addEventListener('gestureend', preventLegacyGesture, { passive: false });

  return () => {
    gameElement.removeEventListener('touchmove', preventPinchZoom);
    window.removeEventListener('gesturestart', preventLegacyGesture);
    window.removeEventListener('gesturechange', preventLegacyGesture);
    window.removeEventListener('gestureend', preventLegacyGesture);
  };
});
</script>

<style>
  :global(html),
  :global(body) {
    background: #74c9ff !important;
  }
</style>
