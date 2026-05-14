export type Role = "user" | "assistant";

export interface ChatMessage {
  role: Role;
  content: string;
  /** Optional inline tool render data attached to assistant messages */
  toolCalls?: ToolCall[];
}

export interface ToolCall {
  name: "capture_lead" | "offer_consultation" | "escalate_to_human";
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
}

export interface ChatResponse {
  reply: string;
  toolCalls: ToolCall[];
  capped?: boolean;
  rateLimited?: boolean;
}