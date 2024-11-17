/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceRight: {
          '0%, 100%': { transform: 'translateX(0) rotate(45deg)' },
          '50%': { transform: 'translateX(5px) rotate(45deg)' },
        },
      },
      animation: {
        arrowBounceRight: 'bounceRight 1.3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    // require('daisyui'),
  ],
}