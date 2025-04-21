/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        typing: {
          "0%, 100%": { width: "0%" },
          "50%": { width: "100%" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        move: {
          "0%": { transform: "translateX(100%)" },
          "50%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        textColorChange: {
          "0%, 100%": { color: "#f87171" }, // red-400
          "50%": { color: "#60a5fa" }, // blue-400
        },
      },
      animation: {
        typing: "typing 10s steps(30) infinite, step-end infinite",
        move: "move 15s linear infinite",
        "text-gradient": "textColorChange 3s ease infinite",
      },
    },
  },
  plugins: [],
};
