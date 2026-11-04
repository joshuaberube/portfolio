import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '20px',
      },
      fontFamily: {
        'sans': ['proxima-nova', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': value => ({'animation-delay': value})
        },
        {
          values: theme('transitionDelay')
        }
      )
    })
  ],
}

