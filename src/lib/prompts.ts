export type ToolId = "email" | "notes" | "planner" | "research" | "chat";

const BASE_RULES = `You are a workplace productivity assistant for busy professionals.
Rules:
- Write in clear, professional business English. No hype, no emoji, no filler.
- Never invent facts, names, dates or figures that were not provided. Mark unknowns as [confirm].
- Use tight markdown: short headings, bullets, bold labels. No preamble like "Sure" or "Here is".`;

export function buildPrompt(
  tool: ToolId,
  input: string,
  options: Record<string, string> = {},
): { system: string; prompt: string } {
  switch (tool) {
    case "email":
      return {
        system: `${BASE_RULES}
Task: draft a single business email.
Structure exactly:
**Subject:** <one line>
then the email body with a greeting, 1-3 short paragraphs, an explicit ask, and a sign-off.
Match the requested tone and audience precisely. Respect the requested length:
Concise = under 120 words, Standard = 120-200 words, Detailed = 200-300 words.`,
        prompt: `Audience: ${options["audience"] ?? "Client"}
Tone: ${options["tone"] ?? "Professional"}
Length: ${options["length"] ?? "Concise"}
Sender name: ${options["sender"]?.trim() || "[your name]"}

What the email must accomplish:
${input}`,
      };

    case "notes":
      return {
        system: `${BASE_RULES}
Task: summarize raw meeting notes or a transcript.
Structure exactly these sections, omitting none:
### Summary — 2 sentences max
### Key points — bullets, one decision or fact each
### Action items — bullets as "**Owner** — task — _due date_" (use [owner?] / [no date] when missing)
### Deadlines — bullets of dated commitments, chronological
### Open questions — bullets, or "None identified"`,
        prompt: `Meeting title: ${options["title"]?.trim() || "[untitled meeting]"}

Raw notes / transcript:
${input}`,
      };

    case "planner":
      return {
        system: `${BASE_RULES}
Task: turn a task dump into a prioritized, scheduled plan.
Prioritize by impact and deadline pressure using P1 (today, critical), P2 (this week), P3 (defer or delegate).
Structure exactly:
### Plan for <horizon>
A markdown table with columns: Priority | Task | Suggested slot | Est. effort | Why
### Focus blocks — 2-4 bullets proposing time blocks
### Cut or delegate — bullets of what should not be done now`,
        prompt: `Planning horizon: ${options["horizon"] ?? "Today"}
Working hours: ${options["hours"] ?? "09:00-17:00"}

Tasks and context:
${input}`,
      };

    case "research":
      return {
        system: `${BASE_RULES}
Task: act as a research analyst working from your own general knowledge.
You have no live web access — never fabricate citations, URLs or statistics. Attribute uncertainty explicitly.
Structure exactly:
### Executive summary — 3 sentences max
### Key insights — 3-5 bullets, each with the "so what"
### Considerations & risks — bullets
### Recommended next steps — numbered, concrete
### Confidence — one line stating confidence level and what would need verification`,
        prompt: `Depth: ${options["depth"] ?? "Standard brief"}
Audience for this brief: ${options["audience"] ?? "Internal team"}

Research question:
${input}`,
      };

    case "chat":
      return {
        system: `${BASE_RULES}
You are the assistant's chat interface. Answer work questions directly and briefly (under 180 words unless asked for more).
Offer a concrete next action when useful. Ask one clarifying question only when the request is unworkable as stated.`,
        prompt: input,
      };
  }
}
