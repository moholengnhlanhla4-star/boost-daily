import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — NexusAI" },
      {
        name: "description",
        content:
          "Turn raw meeting notes or transcripts into key points, owned action items and dated deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — NexusAI" },
      {
        property: "og:description",
        content: "Key points, action items and deadlines extracted from any meeting.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AppShell
      title="Meeting Notes Summarizer"
      subtitle="Key points, actions and deadlines from raw notes."
    >
      <ToolWorkbench
        tool="notes"
        badge="◷ Summarizer"
        heading="Summarize a meeting"
        description="Paste raw notes or a transcript. Output is structured for immediate follow-up."
        selects={[]}
        textFields={[{ key: "title", label: "Meeting title", placeholder: "Product Sync — 14 May" }]}
        inputLabel="Raw notes or transcript"
        placeholder="Paste your meeting notes, bullet fragments or a full transcript here…"
        submitLabel="Summarize notes"
        outputTitle="Structured summary"
      />
    </AppShell>
  );
}
