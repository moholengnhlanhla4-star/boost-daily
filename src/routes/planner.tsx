import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — NexusAI" },
      {
        name: "description",
        content:
          "Turn a messy task dump into a prioritized, time-blocked plan ranked by impact and deadline pressure.",
      },
      { property: "og:title", content: "AI Task Planner — NexusAI" },
      {
        property: "og:description",
        content: "Prioritization and scheduling for your working day.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <AppShell title="AI Task Planner" subtitle="Auto-prioritized by impact and deadline.">
      <ToolWorkbench
        tool="planner"
        badge="⌗ Planner"
        heading="Plan your work"
        description="Dump every task and constraint. Get priorities, slots and what to cut."
        selects={[
          { key: "horizon", label: "Horizon", options: ["Today", "Tomorrow", "This week"] },
          {
            key: "hours",
            label: "Working hours",
            options: ["09:00-17:00", "08:00-16:00", "10:00-18:00", "Flexible"],
          },
        ]}
        inputLabel="Tasks, deadlines and context"
        placeholder="Finalize Q3 proposal (client waiting), review legal redlines, prep Thursday call, 1:1 with Marcus, expenses overdue…"
        submitLabel="Build plan"
        outputTitle="Prioritized plan"
      />
    </AppShell>
  );
}
