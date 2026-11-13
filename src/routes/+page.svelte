<svelte:head>
  <title>Josh Berube - Software Engineer</title>
  <meta
    name="description"
    content="I am a software engineer in Lehi, Utah. I build polished, high-performance products and production systems for the web and more."
  />
  <link rel="canonical" href="https://joshberube.com/" />
  <meta property="og:title" content="Josh Berube - Software Engineer" />
  <meta
    property="og:description"
    content="I am a software engineer in Lehi, Utah. I build polished, high-performance products and production systems for the web and more."
  />
  <meta property="og:type" content="profile" />
  <meta property="og:url" content="https://joshberube.com/" />
  <meta name="twitter:card" content="summary" />
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://joshberube.com/#profilepage",
      "url": "https://joshberube.com/",
      "name": "Josh Berube - Software Engineer",
      "mainEntity": {
        "@type": "Person",
        "@id": "https://joshberube.com/#person",
        "name": "Josh Berube",
        "givenName": "Josh",
        "familyName": "Berube",
        "jobTitle": "Software Engineer",
        "description": "I am a software engineer in Lehi, Utah. I build polished, high-performance products and production systems for the web and more.",
        "url": "https://joshberube.com/",
        "image": "https://avatars.githubusercontent.com/u/59525363?v=4",
        "homeLocation": {
          "@type": "Place",
          "name": "Lehi, Utah, United States"
        },
        "sameAs": [
          "https://www.linkedin.com/in/joshberube/",
          "https://github.com/joshuaberube"
        ],
        "knowsAbout": [
          "Full-stack web development",
          "JavaScript",
          "TypeScript",
          "Svelte",
          "Nuxt.js",
          "Vue",
          "Node.js",
          "Nest.js",
          "React",
          "Next.js",
          "Security",
          "Software engineering",
          "IT Management",
          "PostgreSQL",
          "Prisma",
          "Firebase",
          "Problem solving",
          "Web performance optimization",
          "Search engine optimization",
          "Product analytics and experimentation",
          "Production web systems"
        ]
      }
    }
  </script>
  <link rel="icon" type="image/x-icon" href={asset('favicon.ico')} />
</svelte:head>

<main class="container w-svw h-svh flex flex-col items-center md:justify-center">
  <hgroup class="mt-24 md:mt-0">
    <h1 class="dark:text-white font-bold text-4xl md:text-7xl text-left md:text-center mb-4">
      <span class="inline-block fade-in-text">Hi!</span>
      <span class="inline-block fade-in-text animation-delay-1400!">I'm Josh Berube.</span>
    </h1>
    <p class="dark:text-white fade-in-small animation-delay-3600! text-left md:text-center">I'm a software engineer based in Lehi, Utah who builds polished, high-performance web products and production systems.</p>
  </hgroup>
</main>


<script lang="ts">
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
