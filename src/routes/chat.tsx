import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { AppShell, Disclaimer } from "@/components/AppShell";
import { runAssistant } from "@/lib/ai.functions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — NexusAI" },
      {
        name: "description",
        content:
          "Ask the NexusAI workplace assistant anything about your day, drafts, priorities or decisions.",
      },
      { property: "og:title", content: "AI Chatbot — NexusAI" },
      {
        property: "og:description",
        content: "A conversational assistant for everyday professional work.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Summarize my top 3 priorities for today.",
  "Rewrite this update so it sounds more confident.",
  "What should I ask in tomorrow's client call?",
];

function ChatPage() {
  const run = useServerFn(runAssistant);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const history = messages;
    setMessages([...history, { role: "user", content }]);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const result = await run({ data: { tool: "chat", input: content, history } });
      setMessages((prev) => [...prev, { role: "assistant", content: result.text }]);
    } catch (e) {
      setError((e as Error)?.message ?? "The assistant could not respond.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell title="AI Chatbot" subtitle="Ask anything about your work in progress.">
      <div className="flex flex-col rounded-2xl bg-raise/70 p-5 ring-1 ring-edge shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-md bg-cyan/15 text-xs text-cyan ring-1 ring-cyan/25">
            ✳
          </span>
          <h2 className="font-display text-sm font-semibold">Nexus assistant</h2>
        </div>

        <div className="mt-4 min-h-[46vh] flex-1 space-y-3 overflow-y-auto pr-1 text-sm">
          {messages.length === 0 && !loading && (
            <div className="rounded-xl bg-obsidian p-4 ring-1 ring-edge">
              <p className="text-xs text-faint">Try one of these to start:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-lg px-3 py-1.5 text-xs text-mute ring-1 ring-edge hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) =>
            m.role === "user" ? (
              <div
                key={i}
                className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-cyan/12 px-3 py-2 text-ink/90 ring-1 ring-cyan/20"
              >
                {m.content}
              </div>
            ) : (
              <div
                key={i}
                className="prose-output max-w-[90%] rounded-xl rounded-tl-sm bg-obsidian px-3 py-2.5 text-[13px] leading-relaxed text-ink/85 ring-1 ring-edge"
              >
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            ),
          )}

          {loading && (
            <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-obsidian px-3 py-2.5 ring-1 ring-edge">
              <div className="flex items-center gap-1.5">
                <span className="size-2 animate-pulse rounded-full bg-cyan/60" />
                <span className="size-2 animate-pulse rounded-full bg-cyan/60 [animation-delay:150ms]" />
                <span className="size-2 animate-pulse rounded-full bg-cyan/60 [animation-delay:300ms]" />
                <span className="ml-1 text-[11px] text-faint">Composing…</span>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-amber">{error}</p>}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-4 flex items-center gap-2 rounded-lg bg-obsidian px-3 py-2 ring-1 ring-edge"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Nexus…"
            className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="text-sm text-cyan disabled:opacity-40"
          >
            ↑
          </button>
        </form>
      </div>

      <Disclaimer />
    </AppShell>
  );
}
