<svelte:head>
  <title>Josh Berube's Portfolio</title>
  <meta name="description" content="I'm Josh Berube, a software engineer based in Lehi, Utah. Learn more about me and my work." />
  <link rel="icon" type="image/x-icon" href={asset('favicon.ico')} />
</svelte:head>

<main class="container w-svw h-svh flex flex-col items-center md:justify-center">
  <hgroup class="mt-24 md:mt-0">
    <h1 class="dark:text-white font-bold text-4xl md:text-7xl text-left md:text-center mb-4">
      <span class="inline-block fade-in-text">Hi!</span>
      <span class="inline-block fade-in-text animation-delay-1400!">I'm Josh Berube.</span>
    </h1>
    <p class="dark:text-white fade-in-small animation-delay-3600! text-left md:text-center">I'm a software engineer based in Lehi, Utah. I create beautiful, optimized, and clean&nbsp;websites.</p>
  </hgroup>
</main>

<script>
import { asset } from '$app/paths';
</script>


<style>
@keyframes fadeInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(30%);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

@keyframes fadeInFromBottomSm {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.fade-in-text {
  opacity: 0;
  animation: fadeInFromBottom 1.6s ease;
  animation-fill-mode: forwards;
}

.fade-in-small {
  opacity: 0;
  animation: fadeInFromBottomSm 1.6s ease;
  animation-fill-mode: forwards;
}

@media (prefers-reduced-motion) {
  .fade-in-text, .fade-in-small {
    opacity: 1;
    animation: none;
  }
}
</style>