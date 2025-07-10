import Parser from "rss-parser";
const parser = new Parser();

export async function getDecryptNews() {
  const feed = await parser.parseURL("https://decrypt.co/feed");
  return feed.items.map((item) => ({
    title: item.title || "No title",
    url: item.link || "#",
    source: "Decrypt",
    content: item.contentSnippet || "No summary"
  }));
}
