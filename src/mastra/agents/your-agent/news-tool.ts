import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import fetch from "node-fetch";

export const getCryptoNews = createTool({
  name: "getCryptoNews",
  description: "Get the latest cryptocurrency news headlines and content summaries.",
  inputSchema: z.object({
    topic: z.string().describe("Optional topic to filter news, like Bitcoin, Ethereum, etc."),
  }),
  run: async ({ topic }) => {
    const url = `https://cryptopanic.com/api/v1/posts/?auth_token=YOUR_API_KEY&public=true&currencies=${encodeURIComponent(topic || "")}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.statusText}`);
    }

    const json = await res.json();

    // Sadece başlık ve özet al
    const articles = json.results.slice(0, 5).map((article: any) => ({
      title: article.title,
      url: article.url,
      summary: article.slug,
    }));

    return { articles };
  }
});
