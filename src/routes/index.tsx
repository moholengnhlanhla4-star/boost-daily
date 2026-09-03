import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell, Disclaimer } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexusAI — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate daily work with AI: draft emails, summarize meetings, prioritize tasks, research questions and chat with your assistant.",
      },
      { property: "og:title", content: "NexusAI — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Email drafting, meeting summaries, task planning, research briefs and chat in one professional workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "Tasks automated", value: "128", note: "▲ 12% this week", noteClass: "text-cyan" },
  { label: "Hours saved", value: "14.6", note: "≈ 1.8 workdays", noteClass: "text-mute" },
  { label: "Emails drafted", value: "42", note: "92% approved", noteClass: "text-mute" },
  { label: "Meetings summarized", value: "9", note: "2 need review", noteClass: "text-amber" },
];

function Dashboard() {
  return (
    <AppShell title="Good morning, Alex" subtitle="Your AI is ready. 6 tasks awaiting review.">
      {/* Stat row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-raise/70 p-4 ring-1 ring-edge shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div className="text-xs text-mute">{s.label}</div>
            <div className="mt-2 font-display text-2xl font-semibold">{s.value}</div>
            <div className={`mt-1 text-[11px] ${s.noteClass}`}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* Feature grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-raise to-obsidian p-6 ring-1 ring-edge shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:col-span-2">
          <div className="absolute -top-24 right-0 size-56 rounded-full bg-cyan/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-base font-semibold tracking-tight">
                  Smart Email Generator
                </h2>
                <p className="mt-1 text-xs text-mute">
                  Tune tone and audience, get a polished draft.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-cyan/10 px-2.5 py-1 text-[11px] font-medium text-cyan ring-1 ring-cyan/20">
                ✉ Generator
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Audience", value: "Executive client" },
                { label: "Tone", value: "Confident" },
                { label: "Length", value: "Concise" },
              ].map((f) => (
                <div key={f.label}>
                  <span className="text-[11px] text-mute">{f.label}</span>
                  <div className="mt-1.5 rounded-lg bg-obsidian px-3 py-2 text-sm ring-1 ring-edge">
                    {f.value} ▾
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-4 rounded-xl bg-obsidian/80 p-4 ring-1 ring-edge">
              <div className="mb-2 text-[11px] text-faint">Last generated draft</div>
              <p className="text-sm leading-relaxed text-ink/90">
                Subject: Q3 Partnership Proposal
                <br />
                <br />
                Hi Jordan,
                <br />
                <br />
                Thank you for the productive call. Attached is the revised Q3 proposal reflecting
                your feedback on scope and timeline. I'd propose a 20-minute review on Thursday.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <Link
                  to="/email"
                  className="rounded-md bg-cyan px-3 py-1.5 font-medium text-obsidian"
                >
                  Open generator
                </Link>
                <Link to="/email" className="rounded-md px-3 py-1.5 text-mute ring-1 ring-edge">
                  New draft
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl bg-raise/70 p-5 ring-1 ring-edge shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-cyan/15 text-xs text-cyan ring-1 ring-cyan/25">
              ✳
            </span>
            <h2 className="font-display text-sm font-semibold">AI Chatbot</h2>
          </div>
          <div className="mt-4 flex-1 space-y-3 text-sm">
            <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-cyan/12 px-3 py-2 text-ink/90 ring-1 ring-cyan/20">
              Summarize my top 3 priorities for today.
            </div>
            <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-obsidian px-3 py-2 text-xs leading-relaxed text-mute ring-1 ring-edge">
              1. Finalize the Q3 proposal · 2. Review legal redlines · 3. Prep Thursday client call.
            </div>
          </div>
          <Link
            to="/chat"
            className="mt-4 flex items-center gap-2 rounded-lg bg-obsidian px-3 py-2 ring-1 ring-edge"
          >
            <span className="flex-1 text-xs text-faint">Message Nexus…</span>
            <span className="text-sm text-cyan">↑</span>
          </Link>
        </div>
      </div>

      {/* Second row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-raise/70 p-5 ring-1 ring-edge">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">Meeting Notes</h2>
            <span className="rounded-full bg-amber/10 px-2 py-0.5 text-[11px] text-amber ring-1 ring-amber/20">
              Review
            </span>
          </div>
          <p className="mt-1 text-[11px] text-mute">Product Sync · 41 min · 6 attendees</p>
          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" />
              <span className="text-ink/90">Shipped onboarding A/B test; variant B up 8%.</span>
            </div>
            <div className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber" />
              <span className="text-ink/90">
                Action: Marcus to ship pricing page by <span className="text-amber">Fri 5pm</span>.
              </span>
            </div>
            <div className="flex gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" />
              <span className="text-ink/90">
                Deadline: board deck draft due <span className="text-cyan">Oct 12</span>.
              </span>
            </div>
          </div>
          <Link to="/notes" className="mt-4 inline-block text-[11px] text-cyan">
            Summarize new notes
          </Link>
        </div>

        <div className="rounded-2xl bg-raise/70 p-5 ring-1 ring-edge">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">AI Task Planner</h2>
            <Link to="/planner" className="text-[11px] text-cyan">
              Reschedule
            </Link>
          </div>
          <p className="mt-1 text-[11px] text-mute">Auto-prioritized by impact &amp; deadline</p>
          <div className="mt-4 space-y-2 text-sm">
            {[
              { p: "P1", cls: "text-cyan bg-cyan/10", task: "Finalize Q3 proposal", at: "10:00" },
              { p: "P2", cls: "text-amber bg-amber/10", task: "Review legal redlines", at: "13:30" },
              { p: "P3", cls: "text-faint bg-white/5", task: "Prep client call", at: "16:00" },
            ].map((t) => (
              <div
                key={t.p}
                className="flex items-center gap-3 rounded-lg bg-obsidian px-3 py-2.5 ring-1 ring-edge"
              >
                <span className={`rounded px-1.5 py-0.5 text-[10px] ${t.cls}`}>{t.p}</span>
                <span className="flex-1 text-ink/90">{t.task}</span>
                <span className="text-[11px] text-mute">{t.at}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-raise/70 p-5 ring-1 ring-edge">
          <h2 className="font-display text-sm font-semibold">Research Assistant</h2>
          <p className="mt-1 text-[11px] text-mute">Competitor pricing trends · 2025</p>
          <div className="mt-4 rounded-xl bg-obsidian p-4 ring-1 ring-edge">
            <div className="text-[11px] text-cyan">Key insight</div>
            <p className="mt-1.5 text-sm leading-relaxed text-ink/90">
              Mid-market rivals cut entry pricing 12% year-over-year while bundling AI features —
              recommend a tiered value model.
            </p>
          </div>
          <Link to="/research" className="mt-3 inline-block text-[11px] text-cyan">
            Run a new brief
          </Link>
        </div>
      </div>

      <Disclaimer />
    </AppShell>
  );
}
