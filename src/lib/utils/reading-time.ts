import readingTime from "reading-time";

function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---[\s\S]*?---\s*/m, "");
}

function stripCodeBlocks(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, " ");
}

function stripInlineCode(markdown: string): string {
  return markdown.replace(/`[^`]*`/g, " ");
}

function stripLinks(markdown: string): string {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1");
}

function stripMarkdownFormatting(markdown: string): string {
  return markdown
    .replace(/[#>*_~]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function calculateReadingTime(markdownOrText: string): string {
  const cleaned = stripMarkdownFormatting(
    stripLinks(
      stripInlineCode(stripCodeBlocks(stripFrontmatter(markdownOrText)))
    )
  );

  return readingTime(cleaned).text;
}
