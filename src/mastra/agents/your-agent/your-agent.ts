import { createAgent } from "@mastra/core/agents";
import { getCryptoNews } from "../tools/news";

export default createAgent({
  name: "CryptoNewsSummarizer",
  description: "Fetches and summarizes the latest cryptocurrency news.",
  tools: [getCryptoNews],
  run: async (ctx) => {
    const topic = ctx.input?.topic || "crypto";
    const news = await ctx.callTool(getCryptoNews, { topic });

    const summaries = news.articles.map((item) => {
      return `📰 **${item.title}**\n🔗 ${item.url}\n📝 ${item.summary}\n`;
    });

    return summaries.join("\n\n");
  },
});
