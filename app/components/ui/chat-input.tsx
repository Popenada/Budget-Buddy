"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSubmit: (inquiry: string) => void;
  loading: boolean;
}

export function ChatInput({ onSubmit, loading }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim() || loading) return;
    onSubmit(value.trim());
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-3">
      <textarea
        rows={2}
        placeholder="Should I buy a $500 TV this month?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
      />
      <Button
        size="icon"
        onClick={handleSubmit}
        disabled={!value.trim() || loading}
      >
        <SendHorizontal className="size-4" />
      </Button>
    </div>
  );
}