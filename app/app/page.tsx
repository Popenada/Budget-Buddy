import { BudgetForm } from "@/app/components/BudgetForm";
import { SpendingAdvisor } from "@/app/components/SpendingAdvisor";
import { ArrowLeft, ShieldCheck, TicketCheck } from "lucide-react";
import Link from "next/link";

export default function AppPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[oklch(0.985_0.01_78)] px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Home
          </Link>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 shadow-[0_10px_26px_oklch(0.22_0.02_80/0.06)]">
            <TicketCheck className="size-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-semibold">Budget Buddy</span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-5 py-6 sm:px-8 lg:grid-cols-[21rem_minmax(0,1fr)] lg:items-start lg:py-8">
        <section className="lg:sticky lg:top-6">
          <div className="mb-4 rounded-[1.75rem] border border-border bg-[oklch(0.94_0.04_150)] p-5 shadow-[0_18px_42px_oklch(0.22_0.02_80/0.08)]">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-card text-primary">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h1 className="text-xl font-semibold leading-tight">Check the purchase here.</h1>
                <p className="mt-2 text-sm leading-6 text-[oklch(0.38_0.035_150)]">
                  Add your monthly basics, then ask about the thing you are tempted to buy.
                </p>
              </div>
            </div>
          </div>
          <BudgetForm />
        </section>

        <section className="min-h-[calc(100svh-8rem)] rounded-[2rem] border border-border bg-card p-4 shadow-[0_24px_60px_oklch(0.22_0.02_80/0.1)] sm:p-6">
          <SpendingAdvisor />
        </section>
      </main>
    </div>
  );
}
