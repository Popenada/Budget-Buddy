"use client";

import { MessageBubble } from "./message-bubble";
import type { BudgetAnalysis } from "@/app/api/chat/route";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ChatWindowProps {
  result: BudgetAnalysis | null;
  loading: boolean;
}

export function ChatWindow({ result, loading }: ChatWindowProps) {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <div className="size-6 animate-spin rounded-full border-2 border-border border-t-foreground" />
          <span className="text-sm">Analyzing your budget...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Ask a spending question to get started.</p>
          <p className="text-xs mt-1">e.g. "Should I buy a $500 TV?"</p>
        </div>
      </div>
    );
  }

  const isSpend = result.recommendation === "spend";

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`flex items-center gap-3 rounded-xl p-4 ${
          isSpend
            ? "bg-green-50 border border-green-200 dark:bg-green-950/30 dark:border-green-900"
            : "bg-red-50 border border-red-200 dark:bg-red-950/30 dark:border-red-900"
        }`}
      >
        {isSpend ? (
          <TrendingUp className="size-5 text-green-600 shrink-0" />
        ) : (
          <TrendingDown className="size-5 text-destructive shrink-0" />
        )}
        <div>
          <p className={`text-sm font-semibold ${isSpend ? "text-green-700 dark:text-green-400" : "text-destructive"}`}>
            {isSpend ? "Go ahead and spend" : "Hold off on this one"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{result.reasoning}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Pros
          </h3>
          <ul className="flex flex-col gap-2">
            {result.pros.map((pro, i) => (
              <MessageBubble key={i} text={pro} type="pro" />
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Cons
          </h3>
          <ul className="flex flex-col gap-2">
            {result.cons.map((con, i) => (
              <MessageBubble key={i} text={con} type="con" />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
