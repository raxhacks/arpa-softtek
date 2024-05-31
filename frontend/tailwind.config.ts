import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: {
          500: "#30323D"
        },
        favsnhistory: {
          500: "#5756F5"
        },
        coloHeader: {
          500: "#BBA778"
        }
      },
      darkMode: 'class',
      theme: {
        extend: {}
      }
    },
  },
  plugins: [],
};
export default config;
