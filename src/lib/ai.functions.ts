import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";

import { ASSISTANT_MODEL, createLovableAiGatewayProvider } from "./ai-gateway.server";
import { buildPrompt, type ToolId } from "./prompts";

const RunSchema = z.object({
  tool: z.enum(["email", "notes", "planner", "research", "chat"]),
  input: z.string().min(1, "Input is required").max(20000),
  options: z.record(z.string()).optional(),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() }))
    .optional(),
});

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => RunSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this workspace.");

    const gateway = createLovableAiGatewayProvider(key);
    const { system, prompt } = buildPrompt(data.tool as ToolId, data.input, data.options ?? {});

    try {
      const result = streamText({
        model: gateway(ASSISTANT_MODEL),
        system,
        messages: [
          ...(data.history ?? []).map((m) => ({ role: m.role, content: m.content }) as const),
          { role: "user" as const, content: prompt },
        ],
      });

      const text = await result.text;
      return { text };
    } catch (error) {
      const status = (error as { statusCode?: number; status?: number }).statusCode ??
        (error as { status?: number }).status;
      if (status === 429) {
        throw new Error("The assistant is rate limited right now. Please retry in a moment.");
      }
      if (status === 402) {
        throw new Error("AI credits are exhausted for this workspace. Add credits to continue.");
      }
      if (status === 403) {
        throw new Error("AI access is blocked by workspace policy.");
      }
      throw new Error(
        (error as Error)?.message || "The assistant could not complete this request.",
      );
    }
  });
