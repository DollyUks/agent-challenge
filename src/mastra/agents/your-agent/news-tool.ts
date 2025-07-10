import { Agent } from "@mastra/core/agent";
import { cryptoNewsTool } from "./crypto-news-tool";
import { model } from "../../config";

const name = "Crypto News Agent";

const instructions = `
You are a helpful crypto news summarizer agent.

Your job is to:
- Provide concise summaries of the latest cryptocurrency news.
- If the user gives you a specific topic (e.g. Ethereum, NFT, etc), focus on news about that.
- If the user does not provide a topic, fetch general crypto news.
- For each article, include the title, a short summary, and the link.
- Keep summaries clean and readable, in bullet point format.
`;

export const cryptoNewsAgent = new Agent({
  name,
  instructions,
  model,
  tools: { cryptoNewsTool }
});
