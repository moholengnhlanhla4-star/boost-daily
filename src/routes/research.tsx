import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — NexusAI" },
      {
        name: "description",
        content:
          "Get an analyst-style brief with executive summary, key insights, risks and next steps on any work question.",
      },
      { property: "og:title", content: "AI Research Assistant — NexusAI" },
      {
        property: "og:description",
        content: "Insights, risks and recommended next steps in a structured brief.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppShell title="AI Research Assistant" subtitle="Insights and summaries in analyst format.">
      <ToolWorkbench
        tool="research"
        badge="⌕ Research"
        heading="Research a question"
        description="Works from general knowledge — no live sources, so verify figures before sharing."
        selects={[
          {
            key: "depth",
            label: "Depth",
            options: ["Quick take", "Standard brief", "Deep analysis"],
          },
          {
            key: "audience",
            label: "Brief for",
            options: ["Internal team", "Executive", "Client", "Board"],
          },
        ]}
        inputLabel="Research question"
        placeholder="How are mid-market SaaS competitors packaging AI features, and what pricing model should we consider?"
        submitLabel="Run research"
        outputTitle="Research brief"
      />
    </AppShell>
  );
}
