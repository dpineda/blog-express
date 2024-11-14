import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: '1rem',

      // default breakpoints but with 40px removed
      screens: {
        sm: '400px',
        md: '600px',
        lg: '800px',
        xl: '800px',
        '2xl': '800px',
      },
    },
  },
  plugins: [],
} satisfies Config;
