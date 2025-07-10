import { fetchJSON } from "../utils/fetch";

export async function getCryptoPanicNews(topic?: string) {
  const url = `https://cryptopanic.com/api/v1/posts/?auth_token=YOUR_API_KEY&public=true&currencies=${encodeURIComponent(topic || "")}`;
  const data = await fetchJSON(url);
  return data.results?.map((item: any) => ({
    title: item.title,
    url: item.url,
    source: "CryptoPanic",
    content: item.slug || "No summary."
  })) ?? [];
}
