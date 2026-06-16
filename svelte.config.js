import adapter from "@sveltejs/adapter-vercel";
import { mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";

const highlighter = await createHighlighter({
  themes: ["github-light", "github-dark"],
  langs: [
    "javascript",
    "typescript",
    "python",
    "bash",
    "yaml",
    "json",
    "markdown",
    "svelte",
    "html",
    "css",
  ],
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    mdsvex({
      extensions: [".md"],
      highlight: {
        highlighter: async (code, lang) => {
          const html = highlighter.codeToHtml(code, {
            lang: lang || "text",
            themes: {
              light: "github-light",
              dark: "github-dark",
            },
          });
          return `{@html \`${html
            .replace(/`/g, "\\`")
            .replace(/\$/g, "\\$")}\`}`;
        },
      },
    }),
  ],
  kit: {
    adapter: adapter(),
    inlineStyleThreshold: 0,
  },
};

export default config;
