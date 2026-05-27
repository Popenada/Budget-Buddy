"use client";

import { CheckCircle, XCircle } from "lucide-react";

interface MessageBubbleProps {
  text: string;
  type: "pro" | "con";
}

export function MessageBubble({ text, type }: MessageBubbleProps) {
  return (
    <li className="flex items-start gap-2 text-sm">
      {type === "pro" ? (
        <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
      ) : (
        <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
      )}
      <span className="text-foreground">{text}</span>
    </li>
  );
}
