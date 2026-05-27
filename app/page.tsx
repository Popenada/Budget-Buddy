"use client";

import { useState } from "react";
import { BudgetForm } from "./components/ui/budget-form";
import { ChatInput } from "./components/ui/chat-input";
import { ChatWindow } from "./components/ui/chat-window";
import { useBudgetStore } from "@/app/store/useBudgetStore";
import type { BudgetAnalysis } from "./api/chat/route";

export default function Home() {
  const [result, setResult] = useState<BudgetAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const store = useBudgetStore();

  async function handleInquiry(inquiry: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiry,
          budget: {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-base font-semibold text-foreground">Budget Buddy</h1>
        <p className="text-xs text-muted-foreground">AI-powered spending advisor</p>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="w-full lg:w-72 shrink-0">
          <BudgetForm />
        </aside>

        <main className="flex flex-1 flex-col gap-4">
          <ChatWindow result={result} loading={loading} />
          {error && (
            <p className="text-xs text-destructive text-center">{error}</p>
          )}
          <ChatInput onSubmit={handleInquiry} loading={loading} />
        </main>
      </div>
    </div>
  );
}