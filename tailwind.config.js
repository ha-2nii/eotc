/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          DEFAULT:    "#1A3A5C",
          dark:       "#0F253C",
          light:      "#264F7C",
        },
        gold: {
          DEFAULT:    "#C8A84B",
          bright:     "#D4AF37",
          deep:       "#9E7F1E",
          light:      "#FFF8E7",
        },
        eotcGray: {
          DEFAULT:    "#F5F5F5",
          light:      "#FAFAFA",
          border:     "#E5E5E5",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        serif: ["'Noto Serif Display'", "'Lora'", "Georgia", "serif"],
        geez: ["'Noto Serif Ethiopic'", "'Abyssinica SIL'", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        classic: ["'Lora'", "'Noto Serif Display'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
}

