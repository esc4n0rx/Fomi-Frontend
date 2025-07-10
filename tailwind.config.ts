import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E63946",
          50: "#FDF2F2",
          100: "#FCE8E9",
          200: "#F8D0D2",
          300: "#F3A8AC",
          400: "#EC7077",
          500: "#E63946",
          600: "#D91E2A",
          700: "#B01621",
          800: "#91141C",
          900: "#78141A",
        },
        secondary: {
          DEFAULT: "#FFC300",
          50: "#FFFBEB",
          100: "#FFF3C4",
          200: "#FFE588",
          300: "#FFD43B",
          400: "#FFC300",
          500: "#FFAB00",
          600: "#E68900",
          700: "#CC7A00",
          800: "#B36B00",
          900: "#8A5200",
        },
        neutral: {
          dark: "#1C1C1C",
          light: "#FAFAFA",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-gentle": "bounceGentle 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceGentle: {
          "0%, 20%, 53%, 80%, 100%": { transform: "translate3d(0,0,0)" },
          "40%, 43%": { transform: "translate3d(0,-8px,0)" },
          "70%": { transform: "translate3d(0,-4px,0)" },
          "90%": { transform: "translate3d(0,-2px,0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
