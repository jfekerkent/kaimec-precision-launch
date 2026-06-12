import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "0",
        md: "0",
        sm: "0",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        flash: {
          "0%, 100%": { opacity: "1", color: "hsl(var(--foreground))" },
          "25%": { opacity: "1", color: "#2563eb" },
          "50%": { opacity: "0", color: "#dc2626" },
          "75%": { opacity: "1", color: "#d97706" },
        },
        "laser-left": {
          "0%, 100%": { transform: "translateX(-100%) scaleX(0.3)", opacity: "0" },
          "10%": { opacity: "1" },
          "50%": { transform: "translateX(0%) scaleX(1)", opacity: "1" },
          "90%": { opacity: "1" },
        },
        "laser-right": {
          "0%, 100%": { transform: "translateX(100%) scaleX(0.3)", opacity: "0" },
          "10%": { opacity: "1" },
          "50%": { transform: "translateX(0%) scaleX(1)", opacity: "1" },
          "90%": { opacity: "1" },
        },
        "laser-color": {
          "0%, 100%": { background: "linear-gradient(90deg, transparent, #ef4444, transparent)", boxShadow: "0 0 12px 2px #ef4444" },
          "25%": { background: "linear-gradient(90deg, transparent, #22c55e, transparent)", boxShadow: "0 0 12px 2px #22c55e" },
          "50%": { background: "linear-gradient(90deg, transparent, #3b82f6, transparent)", boxShadow: "0 0 12px 2px #3b82f6" },
          "75%": { background: "linear-gradient(90deg, transparent, #eab308, transparent)", boxShadow: "0 0 12px 2px #eab308" },
        },
        "nav-flash": {
          "0%, 100%": { color: "#ef4444", opacity: "1" },
          "20%": { color: "#f59e0b", opacity: "1" },
          "40%": { color: "#22c55e", opacity: "1" },
          "50%": { opacity: "0.4" },
          "60%": { color: "#3b82f6", opacity: "1" },
          "80%": { color: "#a855f7", opacity: "1" },
        },
        "press-stamp": {
          "0%, 60%, 100%": { transform: "scaleY(1)", color: "hsl(var(--foreground))", textShadow: "none" },
          "70%": { transform: "scaleY(0.7)", color: "#dc2626", textShadow: "0 0 18px #fbbf24" },
          "80%": { transform: "scaleY(1.05)", color: "#f59e0b", textShadow: "0 0 12px #ef4444" },
          "90%": { transform: "scaleY(1)", color: "hsl(var(--foreground))" },
        },
        "press-punch": {
          "0%, 55%, 100%": { transform: "translateY(-140%)" },
          "70%": { transform: "translateY(-10%)" },
          "80%": { transform: "translateY(-10%)" },
          "95%": { transform: "translateY(-140%)" },
        },
        "press-spark": {
          "0%, 65%, 100%": { opacity: "0", transform: "scale(0.4)" },
          "72%": { opacity: "1", transform: "scale(1.4)" },
          "85%": { opacity: "0", transform: "scale(0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        flash: "flash 0.5s ease-in-out infinite",
        "laser-left": "laser-left 0.8s ease-in-out infinite, laser-color 1.2s linear infinite",
        "laser-right": "laser-right 0.8s ease-in-out infinite, laser-color 1.2s linear infinite",
        "laser-dot": "laser-color 1.2s linear infinite",
        "nav-flash": "nav-flash 1s linear infinite",
        "press-stamp": "press-stamp 2.2s ease-in-out infinite",
        "press-punch": "press-punch 2.2s ease-in-out infinite",
        "press-spark": "press-spark 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
