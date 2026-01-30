import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Multimoney Brand Colors
        mm: {
          black: '#000000',
          white: '#FFFFFF',
          green: {
            primary: '#00B100',
            light: '#BAF2A9',
            soft: '#04C072',
          },
          gray: {
            dark: '#272727',
            light: '#F0F0F0',
          },
          accent: {
            turquoise: '#00B3AE',
            blue: '#0F62FF',
            'blue-light': '#00A3F5',
          },
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Circular', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
