import { createTool } from "@mastra/core/tools";
import { z } from "zod";

// Çekilecek haber yapısını belirtiyoruz
const ArticleSchema = z.object({
  title: z.string(),
  summary: z.string(),
  url: z.string().url()
});

export const cryptoNewsTool = createTool({
  id: "get-crypto-news",
  description: "Fetch and summarize latest crypto news. Optionally filtered by topic.",
  inputSchema: z.object({
    topic: z.string().optional().describe("Optional keyword like Bitcoin, Ethereum, Solana, etc.")
  }),
  outputSchema: z.object({
    articles: z.array(ArticleSchema)
  }),
  execute: async ({ context }) => {
    const topic = context.topic ?? "";
    const url = `https://cryptopanic.com/api/v1/posts/?auth_token=YOUR_API_KEY&public=true&currencies=${encodeURIComponent(topic)}`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error("News API failed: " + res.statusText);

    const data = await res.json();
    const articles = data.results?.slice(0, 5).map((item: any) => ({
      title: item.title,
      summary: item.slug ?? "No summary available.",
      url: item.url
    })) ?? [];

    return { articles };
  }
});
