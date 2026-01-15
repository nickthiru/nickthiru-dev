/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts,md}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#F5F0FA",
          dark: "#1A1A2E",
        },
        surface: {
          DEFAULT: "#FDFBFF",
          dark: "#16213E",
        },
        primary: {
          DEFAULT: "#1A1A1A",
          dark: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#525252",
          dark: "#A3A3A3",
        },
        muted: {
          DEFAULT: "#737373",
          dark: "#737373",
        },
        accent: {
          DEFAULT: "#A286DE",
          hover: "#8161C7",
          light: "#C5B1F0",
          lighter: "#E8DFFC",
          dark: "#6241AA",
        },
        pink: {
          DEFAULT: "#DA7ADA",
          light: "#EEA8EE",
          lighter: "#FBDCFB",
          dark: "#C052C0",
          darker: "#A233A2",
        },
        blue: {
          DEFAULT: "#84A3DC",
          light: "#B0C6EF",
          lighter: "#DFE9FB",
          dark: "#5E82C3",
          darker: "#3F63A5",
        },
        border: {
          DEFAULT: "#E5E5E5",
          dark: "#262626",
        },
        code: {
          DEFAULT: "#F5F5F4",
          dark: "#1C1C1C",
        },
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        h1: ["2.25rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["1.75rem", { lineHeight: "1.3", fontWeight: "700" }],
        h3: ["1.375rem", { lineHeight: "1.4", fontWeight: "700" }],
        h4: ["1.125rem", { lineHeight: "1.4", fontWeight: "700" }],
        body: ["1.0625rem", { lineHeight: "1.7", fontWeight: "500" }],
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "500" }],
        code: ["0.9375rem", { lineHeight: "1.6", fontWeight: "400" }],
      },
      maxWidth: {
        prose: "680px",
        page: "1200px",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "680px",
            color: theme("colors.primary.DEFAULT"),
            a: {
              color: theme("colors.accent.DEFAULT"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            "h1, h2, h3, h4": {
              color: theme("colors.primary.DEFAULT"),
              fontWeight: "600",
            },
            code: {
              backgroundColor: theme("colors.code.DEFAULT"),
              padding: "0.125rem 0.25rem",
              borderRadius: "0.25rem",
              fontFamily: theme("fontFamily.mono").join(", "),
            },
            "code::before": { content: '""' },
            "code::after": { content: '""' },
            blockquote: {
              borderLeftColor: theme("colors.accent.DEFAULT"),
              fontStyle: "italic",
              color: theme("colors.secondary.DEFAULT"),
            },
            pre: {
              backgroundColor: theme("colors.code.DEFAULT"),
              borderRadius: "0.5rem",
              padding: "1rem",
              overflowX: "auto",
            },
          },
        },
        invert: {
          css: {
            color: "#E5E5E5",
            a: {
              color: theme("colors.accent.DEFAULT"),
            },
            "h1, h2, h3, h4": {
              color: "#FAFAFA",
            },
            strong: {
              color: "#FAFAFA",
            },
            code: {
              backgroundColor: theme("colors.code.dark"),
              color: "#E5E5E5",
            },
            blockquote: {
              color: "#D4D4D4",
            },
            pre: {
              backgroundColor: theme("colors.code.dark"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
