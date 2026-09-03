import { createFileRoute } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";
import { ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — NexusAI" },
      {
        name: "description",
        content:
          "Draft professional business emails tuned to tone, audience and length with the NexusAI workplace assistant.",
      },
      { property: "og:title", content: "Smart Email Generator — NexusAI" },
      {
        property: "og:description",
        content: "Tone and audience-aware email drafting for busy professionals.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AppShell
      title="Smart Email Generator"
      subtitle="Tone and audience-aware drafts in one pass."
    >
      <ToolWorkbench
        tool="email"
        badge="✉ Generator"
        heading="Compose email"
        description="Set the audience, tone and length, then generate a polished draft."
        selects={[
          {
            key: "audience",
            label: "Audience",
            options: [
              "Executive client",
              "Existing client",
              "Prospect",
              "Internal team",
              "Manager",
              "Vendor",
            ],
          },
          {
            key: "tone",
            label: "Tone",
            options: ["Confident", "Professional", "Warm", "Diplomatic", "Direct", "Apologetic"],
          },
          { key: "length", label: "Length", options: ["Concise", "Standard", "Detailed"] },
        ]}
        textFields={[{ key: "sender", label: "Sign off as", placeholder: "Alex Rivera" }]}
        inputLabel="What should this email accomplish?"
        placeholder="Follow up on the Q3 onboarding call, confirm the revised timeline, and ask for sign-off on the pilot scope before Friday."
        submitLabel="Generate draft"
        outputTitle="Generated draft"
      />
    </AppShell>
  );
}
