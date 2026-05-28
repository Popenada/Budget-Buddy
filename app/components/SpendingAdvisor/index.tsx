"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "../ui/message-bubble";
import { useBudgetStore } from "@/app/store/useBudgetStore";
import type { BudgetAnalysis } from "@/app/api/chat/route";
import { CheckCircle2, Clock3, LoaderCircle, SendHorizontal, Sparkles, TicketCheck, TrendingDown, TrendingUp } from "lucide-react";

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
            groceries: store.groceries,
            phone: store.phone,
            insurance: store.insurance,
            debtPayments: store.debtPayments,
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
  const totalFixed = store.totalMonthlyFixed();
  const leftover = store.monthlyIncome - totalFixed;

  return (
    <div className="flex min-h-full flex-1 flex-col gap-5">
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            Calm checkout pause
          </p>
          <h2 className="mt-4 max-w-[14ch] text-3xl font-semibold leading-none sm:text-4xl">
            Ask before you spend.
          </h2>
          <p className="mt-3 max-w-[58ch] text-sm leading-6 text-muted-foreground">
            Budget Buddy looks at your monthly basics and gives a plain answer, without judging the thing you want.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-background p-4 sm:min-w-44">
          <p className="text-xs text-muted-foreground">Current cushion</p>
          <p className={`mt-1 text-2xl font-semibold ${leftover >= 0 ? "text-foreground" : "text-destructive"}`}>
            ${leftover.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">after fixed costs</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {loading && (
          <div className="flex flex-1 items-center justify-center rounded-[1.75rem] border border-dashed border-border bg-background py-16">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <LoaderCircle className="size-6 animate-spin text-primary" aria-hidden="true" />
              <span className="text-sm">Checking the tradeoff...</span>
            </div>
          </div>
        )}

        {!loading && !result && (
          <div className="flex flex-1 items-center justify-center rounded-[1.75rem] border border-dashed border-border bg-background px-6 py-16">
            <div className="max-w-sm text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-3xl bg-[oklch(0.94_0.04_150)] text-primary">
                <TicketCheck className="size-7" aria-hidden="true" />
              </div>
              <p className="mt-5 text-lg font-semibold text-foreground">Start with one real purchase.</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Try &quot;Should I buy $300 worth of concert tickets?&quot; or whatever is sitting in your cart.
              </p>
            </div>
          </div>
        )}

        {!loading && result && (
          <div className="flex flex-col gap-4">
            <div
              className={`flex items-start gap-3 rounded-[1.75rem] border p-5 ${
                isSpend
                  ? "border-[oklch(0.82_0.05_150)] bg-[oklch(0.94_0.04_150)]"
                  : "border-[oklch(0.84_0.045_32)] bg-[oklch(0.96_0.025_32)]"
              }`}
            >
              {isSpend ? (
                <TrendingUp className="mt-0.5 size-5 shrink-0 text-[oklch(0.42_0.09_150)]" />
              ) : (
                <TrendingDown className="mt-0.5 size-5 shrink-0 text-[oklch(0.55_0.15_32)]" />
              )}
              <div>
                <p className={`text-base font-semibold ${isSpend ? "text-[oklch(0.27_0.05_150)]" : "text-[oklch(0.44_0.1_32)]"}`}>
                  {isSpend ? "This looks okay." : "Maybe wait on this one."}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{result.reasoning}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border bg-background p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                  Reasons it could work
                </h3>
                <ul className="flex flex-col gap-2">
                  {result.pros.map((pro, i) => (
                    <MessageBubble key={i} text={pro} type="pro" />
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.5rem] border border-border bg-background p-4">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Clock3 className="size-4 text-[oklch(0.55_0.15_32)]" aria-hidden="true" />
                  Reasons to pause
                </h3>
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

      {error && (
        <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <div className="flex items-end gap-2 rounded-[1.5rem] border border-border bg-background p-3 shadow-[0_12px_30px_oklch(0.22_0.02_80/0.06)]">
        <textarea
          rows={2}
          placeholder="Should I buy $300 worth of concert tickets?"
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="min-h-14 flex-1 resize-none bg-transparent px-2 py-1 text-sm leading-6 outline-none placeholder:text-muted-foreground disabled:opacity-50"
          aria-label="Purchase question"
        />
        <Button size="icon-lg" onClick={handleSubmit} disabled={!inquiry.trim() || loading} aria-label="Check purchase">
          <SendHorizontal className="size-4" />
        </Button>
      </div>
    </div>
  );
}
