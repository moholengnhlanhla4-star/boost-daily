import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/", label: "Dashboard", glyph: "▦" },
  { to: "/email", label: "Email Generator", glyph: "✉" },
  { to: "/notes", label: "Meeting Notes", glyph: "◷" },
  { to: "/planner", label: "Task Planner", glyph: "⌗" },
  { to: "/research", label: "Research", glyph: "⌕" },
  { to: "/chat", label: "AI Chatbot", glyph: "✳" },
] as const;

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="flex items-center gap-3 px-6 pt-6 pb-6">
        <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan via-cyan/40 to-transparent font-display text-lg font-bold text-obsidian shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
          N
        </div>
        <div>
          <div className="font-display font-semibold leading-none tracking-tight">
            Nexus<span className="text-cyan">AI</span>
          </div>
          <div className="mt-1 text-[11px] text-mute">Productivity Studio</div>
        </div>
      </div>

      <nav className="space-y-1 px-3 text-sm">
        <div className="px-3 pt-2 pb-2 text-[10px] tracking-[0.18em] text-faint uppercase">
          Workspace
        </div>
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeOptions={{ exact: item.to === "/" }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-mute transition-colors hover:text-ink"
            activeProps={{
              className:
                "flex items-center gap-3 rounded-lg px-3 py-2.5 bg-raise text-ink ring-1 ring-edge shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
            }}
          >
            <span aria-hidden="true">{item.glyph}</span> {item.label}
          </Link>
        ))}
        <div className="px-3 pt-4 pb-2 text-[10px] tracking-[0.18em] text-faint uppercase">
          System
        </div>
        <span className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-mute">
          <span aria-hidden="true">⚙</span> Settings
        </span>
      </nav>

      <div className="mt-auto p-4">
        <div className="rounded-xl bg-raise/80 p-4 ring-1 ring-edge">
          <div className="flex items-center justify-between text-xs">
            <span className="text-mute">Model</span>
            <span className="font-medium text-cyan">Nexus-2 Pro</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-edge">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan to-cyan/30" />
          </div>
          <div className="mt-2 text-[11px] text-faint">80% of daily credits used</div>
        </div>
      </div>
    </>
  );
}

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-obsidian font-body text-ink antialiased">
      <aside className="hidden w-[264px] shrink-0 flex-col border-r border-edge bg-pane/70 md:flex">
        <SidebarBody />
      </aside>

      {open && (
        <div className="fixed inset-0 z-30 md:hidden">
          <button
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />
          <div className="relative flex h-full w-[264px] flex-col border-r border-edge bg-pane">
            <SidebarBody onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-edge bg-obsidian/90 px-4 py-4 backdrop-blur sm:px-6">
          <button
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
            className="rounded-lg px-2 py-1 text-mute ring-1 ring-edge md:hidden"
          >
            ☰
          </button>
          <div className="min-w-0">
            <h1 className="truncate font-display text-lg font-semibold tracking-tight">{title}</h1>
            <p className="truncate text-xs text-mute">{subtitle}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg bg-raise px-3 py-2 text-sm text-mute ring-1 ring-edge lg:flex">
              <span aria-hidden="true">⌕</span>
              <span className="text-faint">Ask Nexus…</span>
              <kbd className="ml-2 rounded border border-edge px-1 text-[10px] text-faint">⌘K</kbd>
            </div>
            <Link
              to="/planner"
              className="rounded-lg bg-cyan px-4 py-2 text-sm font-medium text-obsidian shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_24px_-8px_rgba(90,209,240,0.6)]"
            >
              + New task
            </Link>
            <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-amber/70 to-amber/10 text-xs font-semibold ring-1 ring-edge">
              AR
            </div>
          </div>
        </header>

        <div className="max-w-[1180px] space-y-6 p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}

export function Disclaimer() {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-amber/10 px-4 py-3 text-[12px] text-amber/90 ring-1 ring-amber/15">
      <span aria-hidden="true">⚠</span> AI-generated content may require human review. Verify facts,
      tone, and compliance.
    </div>
  );
}
