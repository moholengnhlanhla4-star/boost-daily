import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { runAssistant } from "@/lib/ai.functions";
import type { ToolId } from "@/lib/prompts";
import { Disclaimer } from "./AppShell";

export type SelectField = {
  key: string;
  label: string;
  options: string[];
};

export type TextField = {
  key: string;
  label: string;
  placeholder?: string;
};

export function ToolWorkbench({
  tool,
  badge,
  heading,
  description,
  selects,
  textFields = [],
  inputLabel,
  placeholder,
  submitLabel,
  outputTitle,
}: {
  tool: ToolId;
  badge: string;
  heading: string;
  description: string;
  selects: SelectField[];
  textFields?: TextField[];
  inputLabel: string;
  placeholder: string;
  submitLabel: string;
  outputTitle: string;
}) {
  const run = useServerFn(runAssistant);
  const [options, setOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const s of selects) initial[s.key] = s.options[0]!;
    for (const t of textFields) initial[t.key] = "";
    return initial;
  });
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const result = await run({ data: { tool, input, options } });
      setOutput(result.text);
    } catch (e) {
      setError((e as Error)?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Input */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-raise to-obsidian p-5 ring-1 ring-edge shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6 lg:col-span-3">
          <div className="absolute -top-24 right-0 size-56 rounded-full bg-cyan/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-base font-semibold tracking-tight">{heading}</h2>
                <p className="mt-1 text-xs text-mute">{description}</p>
              </div>
              <span className="shrink-0 rounded-full bg-cyan/10 px-2.5 py-1 text-[11px] font-medium text-cyan ring-1 ring-cyan/20">
                {badge}
              </span>
            </div>

            {selects.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {selects.map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-[11px] text-mute">{field.label}</span>
                    <select
                      value={options[field.key]}
                      onChange={(e) =>
                        setOptions((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="mt-1.5 w-full rounded-lg bg-obsidian px-3 py-2 text-sm text-ink ring-1 ring-edge outline-none focus:ring-cyan/60"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            )}

            {textFields.length > 0 && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {textFields.map((field) => (
                  <label key={field.key} className="block">
                    <span className="text-[11px] text-mute">{field.label}</span>
                    <input
                      value={options[field.key] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        setOptions((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="mt-1.5 w-full rounded-lg bg-obsidian px-3 py-2 text-sm text-ink ring-1 ring-edge outline-none placeholder:text-faint focus:ring-cyan/60"
                    />
                  </label>
                ))}
              </div>
            )}

            <label className="mt-4 block">
              <span className="text-[11px] text-mute">{inputLabel}</span>
              <textarea
                rows={7}
                value={input}
                placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)}
                className="mt-1.5 w-full resize-none rounded-lg bg-obsidian px-3 py-2.5 text-sm leading-relaxed text-ink ring-1 ring-edge outline-none placeholder:text-faint focus:ring-cyan/60"
              />
            </label>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={generate}
                disabled={loading || !input.trim()}
                className="rounded-lg bg-cyan px-4 py-2 text-sm font-medium text-obsidian shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_24px_-8px_rgba(90,209,240,0.6)] disabled:opacity-40 disabled:shadow-none"
              >
                {loading ? "Generating…" : submitLabel}
              </button>
              <span className="text-[11px] text-faint">{input.trim().split(/\s+/).filter(Boolean).length} words in</span>
            </div>
          </div>
        </section>

        {/* Output */}
        <section className="flex flex-col rounded-2xl bg-raise/70 p-5 ring-1 ring-edge shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">{outputTitle}</h2>
            {loading && (
              <span className="flex items-center gap-1.5">
                <span className="size-2 animate-pulse rounded-full bg-cyan/60" />
                <span className="size-2 animate-pulse rounded-full bg-cyan/60 [animation-delay:150ms]" />
                <span className="size-2 animate-pulse rounded-full bg-cyan/60 [animation-delay:300ms]" />
                <span className="ml-1 text-[11px] text-faint">Composing…</span>
              </span>
            )}
          </div>

          <div className="mt-4 flex-1 rounded-xl bg-obsidian/80 p-4 ring-1 ring-edge">
            {loading ? (
              <div className="space-y-2.5">
                {["w-11/12", "w-full", "w-10/12", "w-4/5", "w-3/5"].map((w) => (
                  <div key={w} className={`h-3.5 animate-pulse rounded bg-edge ${w}`} />
                ))}
              </div>
            ) : error ? (
              <p className="text-sm text-amber">{error}</p>
            ) : output ? (
              <div className="prose-output text-sm leading-relaxed text-ink/90">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            ) : (
              <p className="text-sm text-faint">
                Your generated output will appear here. Fill in the brief and run the tool.
              </p>
            )}
          </div>

          {output && !loading && (
            <div className="mt-4 flex items-center gap-2 text-xs">
              <button
                onClick={copy}
                className="rounded-md bg-cyan px-3 py-1.5 font-medium text-obsidian"
              >
                {copied ? "Copied" : "Copy output"}
              </button>
              <button
                onClick={generate}
                className="rounded-md px-3 py-1.5 text-mute ring-1 ring-edge"
              >
                Regenerate
              </button>
            </div>
          )}
        </section>
      </div>

      <Disclaimer />
    </div>
  );
}
