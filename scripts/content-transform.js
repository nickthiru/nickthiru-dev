const fs = require("fs");
const path = require("path");

class ContentTransformer {
  constructor() {
    this.buildLogPath = "/home/dev/projects/thiru-ai-labs/build-logs";
  }

  extractSection(lines, header) {
    const startIdx = lines.findIndex((line) => line.includes(header));
    if (startIdx === -1) return "";

    const content = [];
    for (let i = startIdx + 1; i < lines.length; i++) {
      if (lines[i].startsWith("**") || lines[i].startsWith("---")) break;
      if (lines[i].startsWith("- ")) content.push(lines[i].substring(2));
    }

    return content.join(" ");
  }

  getLatestBuildLog() {
    const files = fs
      .readdirSync(this.buildLogPath)
      .filter((f) => f.endsWith(".md"))
      .sort()
      .reverse();

    if (files.length === 0) return null;

    const latestFile = files[0];
    const buildLog = fs.readFileSync(
      path.join(this.buildLogPath, latestFile),
      "utf8",
    );

    return { filename: latestFile, content: buildLog };
  }

  generateLinkedInPost(buildEntry) {
    const lines = buildEntry.split("\n");
    const date = lines[0].match(/\[(\d{4}-\d{2}-\d{2})\]/)?.[1] || "";
    const milestone = lines[0].split(" - ")[1] || "";

    const buildSection = this.extractSection(lines, "**Build:**");
    const whySection = this.extractSection(lines, "**Why:**");
    const lessonSection = this.extractSection(lines, "**Lesson:**");
    const nextSection = this.extractSection(lines, "**Next:**");

    return `Build log update: ${milestone}

${buildSection}

Why this matters:
${whySection}

The challenge:
${lessonSection}

Next step:
${nextSection}

Building in public, one step at a time 🚀

#BuildInPublic #DevCommunity #IndieHackers`;
  }

  generateTwitterThread(buildEntry) {
    const lines = buildEntry.split("\n");
    const milestone = lines[0].split(" - ")[1] || "";

    const buildSection = this.extractSection(lines, "**Build:**");
    const whySection = this.extractSection(lines, "**Why:**");
    const lessonSection = this.extractSection(lines, "**Lesson:**");
    const nextSection = this.extractSection(lines, "**Next:**");

    const tweets = [
      `1/ Build log update: ${milestone}`,
      "",
      `2/ What I built:`,
      `${buildSection.substring(0, 200)}...`,
      "",
      `3/ Why it matters:`,
      `${whySection.substring(0, 200)}...`,
      "",
      `4/ What I learned:`,
      `${lessonSection.substring(0, 200)}...`,
      "",
      `5/ What's next:`,
      `${nextSection.substring(0, 200)}...`,
      "",
      `6/ Building in public, transparently.`,
      `Every step, every decision, every mistake.`,
      "",
      `7/ Who else is building in public?`,
      `Would love to see what you're working on! 🚀`,
      "",
      `#BuildInPublic #IndieHackers #DevCommunity`,
    ];

    return tweets;
  }

  generateBlogPost(entries) {
    const title = `Building in Public: ${entries.length} Lessons from ${entries[0].split(" - ")[1]}`;

    const introduction = `Over the past few weeks, I've been building and documenting every step of the journey. Here are the key lessons learned, mistakes made, and insights gained.`;

    const sections = entries
      .map((entry, index) => {
        const date = entry.match(/\[(\d{4}-\d{2}-\d{2})\]/)?.[1] || "";
        const milestone = entry.split(" - ")[1] || "";
        const buildSection = this.extractSection(
          entry.split("\n"),
          "**Build:**",
        );
        const lessonSection = this.extractSection(
          entry.split("\n"),
          "**Lesson:**",
        );

        return `
## ${index + 1}. ${milestone}

*${date}*

**What I Built:**
${buildSection}

**Key Lesson:**
${lessonSection}

---`;
      })
      .join("\n");

    const conclusion = `
## What's Next

Based on these lessons, I'm focusing on:
- [Next priority 1]
- [Next priority 2]  
- [Next priority 3]

**Join the Journey:**
If you're building in public or interested in following along, you can:
- Follow me on LinkedIn for daily updates
- Check out the build log for technical details
- Join the beta waitlist at [your-site]

**Build Resources:**
- [Link to repository if public]
- [Link to documentation]
- [Link to other resources]

---

*This is part of my "Building in Public" series. Follow along for more transparent insights into the startup journey.*`;

    return `---
title: "${title}"
date: "${new Date().toISOString().split("T")[0]}"
description: "${introduction}"
tags: ["building-in-public", "startup", "lessons"]
---

# ${title}

${introduction}

${sections}

${conclusion}`;
  }

  async transformLatestContent() {
    const latestLog = this.getLatestBuildLog();
    if (!latestLog) {
      console.log("❌ No build logs found");
      return;
    }

    // Extract the latest entry (assuming one entry per file)
    const entries = latestLog.content
      .split("\n\n")
      .filter(
        (section) => section.startsWith("## [") && section.includes("] - "),
      );

    if (entries.length === 0) {
      console.log("❌ No valid entries found in build log");
      return;
    }

    const latestEntry = entries[entries.length - 1];

    // Generate content for each platform
    const linkedinPost = this.generateLinkedInPost(latestEntry);
    const twitterThread = this.generateTwitterThread(latestEntry);
    const blogPost = this.generateBlogPost(entries);

    // Dual artifact storage strategy
    const nickthiruDevArtifacts = "/home/dev/projects/nickthiru-dev/artifacts";
    const thiruAiLabsArtifacts = "/home/dev/projects/thiru-ai-labs/artifacts";

    // Ensure both directories exist
    if (!fs.existsSync(nickthiruDevArtifacts)) {
      fs.mkdirSync(nickthiruDevArtifacts, { recursive: true });
    }
    if (!fs.existsSync(thiruAiLabsArtifacts)) {
      fs.mkdirSync(thiruAiLabsArtifacts, { recursive: true });
    }

    // Save to nickthiru-dev (website assets)
    fs.writeFileSync(
      path.join(nickthiruDevArtifacts, "latest-linkedin-post.md"),
      linkedinPost,
    );
    fs.writeFileSync(
      path.join(nickthiruDevArtifacts, "latest-twitter-thread.txt"),
      twitterThread.join("\n\n---\n\n"),
    );
    fs.writeFileSync(
      path.join(nickthiruDevArtifacts, "latest-blog-post.md"),
      blogPost,
    );

    // Save to thiru-ai-labs (development context)
    fs.writeFileSync(
      path.join(thiruAiLabsArtifacts, "latest-linkedin-post.md"),
      linkedinPost,
    );
    fs.writeFileSync(
      path.join(thiruAiLabsArtifacts, "latest-twitter-thread.txt"),
      twitterThread.join("\n\n---\n\n"),
    );
    fs.writeFileSync(
      path.join(thiruAiLabsArtifacts, "latest-blog-post.md"),
      blogPost,
    );

    console.log("✅ Content transformation complete:");
    console.log("  📝 LinkedIn posts saved to both artifacts directories");
    console.log("  🐦 Twitter threads saved to both artifacts directories");
    console.log("  📄 Blog posts saved to both artifacts directories");
    console.log(
      "  🔄 Dual storage: thiru-ai-labs (dev) + nickthiru-dev (website)",
    );

    return {
      linkedinPost,
      twitterThread,
      blogPost,
      sourceFile: latestLog.filename,
      storageLocations: {
        development: thiruAiLabsArtifacts,
        website: nickthiruDevArtifacts,
      },
    };
  }
}

// Usage
const transformer = new ContentTransformer();
transformer.transformLatestContent().catch(console.error);
