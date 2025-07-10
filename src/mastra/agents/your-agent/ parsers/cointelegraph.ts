import Parser from "rss-parser";
const parser = new Parser();

export async function getCoinTelegraphNews() {
  const feed = await parser.parseURL("https://cointelegraph.com/rss");
  return feed.items.map((item) => ({
    title: item.title || "No title",
    url: item.link || "#",
    source: "CoinTelegraph",
    content: item.contentSnippet || "No summary"
  }));
}
