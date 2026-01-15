import adapter from "@sveltejs/adapter-static";
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
    adapter: adapter({
      pages: "build",
      assets: "build",
      fallback: "404.html",
      precompress: false,
      strict: true,
    }),
    prerender: {
      entries: ["*"],
    },
    inlineStyleThreshold: 0,
  },
};

export default config;
