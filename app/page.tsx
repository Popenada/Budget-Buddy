"use client";

import { BudgetForm } from "./components/BudgetForm";
import { SpendingAdvisor } from "./components/SpendingAdvisor";

export default function Home() {
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

        <main className="flex flex-1 flex-col">
          <SpendingAdvisor />
        </main>
      </div>
    </div>
  );
}