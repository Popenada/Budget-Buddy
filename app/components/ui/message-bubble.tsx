"use client";

import { CheckCircle, Clock3 } from "lucide-react";

interface MessageBubbleProps {
  text: string;
  type: "pro" | "con";
}

export function MessageBubble({ text, type }: MessageBubbleProps) {
  return (
    <li className="flex items-start gap-2 text-sm leading-6">
      {type === "pro" ? (
        <CheckCircle className="mt-1 size-4 shrink-0 text-primary" />
      ) : (
        <Clock3 className="mt-1 size-4 shrink-0 text-[oklch(0.55_0.15_32)]" />
      )}
      <span className="text-foreground">{text}</span>
    </li>
  );
}
