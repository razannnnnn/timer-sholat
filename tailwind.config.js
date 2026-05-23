/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#071B33",
          900: "#0B2447",
          800: "#0D2D5A",
          700: "#19376D",
        },
        sky: { DEFAULT: "#00AEEF" },
        gold: { DEFAULT: "#F5C542", light: "#FFD97D" },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        arabic: ["var(--font-arabic)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "radial-navy":
          "radial-gradient(ellipse at 20% 20%, #19376D 0%, #0B2447 40%, #071B33 100%)",
        "glow-sky":
          "radial-gradient(circle, rgba(0,174,239,0.18) 0%, transparent 70%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-up": "fade-up 0.6s ease both",
      },
    },
  },
  plugins: [],
};
