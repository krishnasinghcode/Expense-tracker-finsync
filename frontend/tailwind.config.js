/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        text: "var(--color-text)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        positive: "var(--color-positive)",
        negative: "var(--color-negative)",
        neutral: "var(--color-neutral)",
      },
    },
  },
  plugins: [],
};
