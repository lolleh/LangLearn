/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sl: {
          green: "#1EB53A",
          "green-dark": "#15803D",
          "green-light": "#BBF7D0",
          blue: "#0072C6",
          "blue-dark": "#005B9E",
          "blue-light": "#DBEAFE",
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "fade-in-up-delay-1": "fadeInUp 0.7s ease-out 0.15s forwards",
        "fade-in-up-delay-2": "fadeInUp 0.7s ease-out 0.3s forwards",
        "gradient": "gradient 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [],
}
