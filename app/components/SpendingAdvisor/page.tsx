"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "../ui/message-bubble";
import { useBudgetStore } from "@/app/store/useBudgetStore";
import type { BudgetAnalysis } from "@/app/api/chat/route";
import { SendHorizontal, TrendingUp, TrendingDown } from "lucide-react";

export function SpendingAdvisor() {
  const [inquiry, setInquiry] = useState("");
  const [result, setResult] = useState<BudgetAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const store = useBudgetStore();

  async function handleSubmit() {
    if (!inquiry.trim() || loading) return;
    setLoading(true);
    setError(null);

    try {
      // Fetches api using REST API call
      // Sends a JSON file of rent, gas, utiliies and otherRecurring 
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiry: inquiry.trim(),
          budget: {
            monthlyIncome: store.monthlyIncome,
            rent: store.rent,
            gas: store.gas,
            utilities: store.utilities,
            transportation: store.transportation,
            otherRecurring: store.otherRecurring,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data);
      setInquiry("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const isSpend = result?.recommendation === "spend";

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Results area */}
      <div className="flex flex-1 flex-col">
        {loading && (
          <div className="flex flex-1 items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <div className="size-6 animate-spin rounded-full border-2 border-border border-t-foreground" />
              <span className="text-sm">Analyzing your budget...</span>
            </div>
          </div>
        )}

        {!loading && !result && (
          <div className="flex flex-1 items-center justify-center py-16">
            <div className="text-center text-muted-foreground">
              <p className="text-sm">Ask a spending question to get started.</p>
              <p className="text-xs mt-1">e.g. "Should I buy a $500 TV?"</p>
            </div>
          </div>
        )}

        {!loading && result && (
          <div className="flex flex-col gap-4">
            <div
              className={`flex items-center gap-3 rounded-xl p-4 border ${
                isSpend
                  ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900"
                  : "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900"
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
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Pros</h3>
                <ul className="flex flex-col gap-2">
                  {result.pros.map((pro, i) => (
                    <MessageBubble key={i} text={pro} type="pro" />
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Cons</h3>
                <ul className="flex flex-col gap-2">
                  {result.cons.map((con, i) => (
                    <MessageBubble key={i} text={con} type="con" />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      {error && <p className="text-xs text-destructive text-center">{error}</p>}
      <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-3">
        <textarea
          rows={2}
          placeholder="Should I buy a $500 TV this month?"
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
        />
        <Button size="icon" onClick={handleSubmit} disabled={!inquiry.trim() || loading}>
          <SendHorizontal className="size-4" />
        </Button>
      </div>
    </div>
  );
}
