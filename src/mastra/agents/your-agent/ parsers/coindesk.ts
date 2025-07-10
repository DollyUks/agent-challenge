import Parser from "rss-parser";
const parser = new Parser();

export async function getCoinDeskNews() {
  const feed = await parser.parseURL("https://www.coindesk.com/arc/outboundfeeds/rss/");
  return feed.items.map((item) => ({
    title: item.title || "No title",
    url: item.link || "#",
    source: "CoinDesk",
    content: item.contentSnippet || "No summary"
  }));
}
