import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  ShieldCheck,
  Sparkles,
  TicketCheck,
} from "lucide-react";

const steps = [
  {
    title: "Ask in plain language",
    text: "Type the purchase exactly how you would say it to a friend.",
  },
  {
    title: "See the tradeoff",
    text: "Budget Buddy checks the question against your monthly costs.",
  },
  {
    title: "Decide without shame",
    text: "Get a direct answer that keeps your dignity intact.",
  },
];

const guardrails = [
  "No bank-dashboard clutter",
  "No shame-based money advice",
  "No green or red without words",
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative isolate flex min-h-[92svh] flex-col px-5 py-5 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 -z-10 h-[72%] bg-[radial-gradient(circle_at_76%_20%,oklch(0.9_0.05_150)_0,transparent_34%),linear-gradient(135deg,oklch(0.985_0.01_78),oklch(0.955_0.018_92))]" />
        <div className="absolute left-1/2 top-24 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full border border-border/70 opacity-60" />

        <header className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-border/80 bg-background/85 px-4 py-3 shadow-[0_14px_40px_oklch(0.22_0.02_80/0.08)]">
          <Link href="/" className="flex items-center gap-2" aria-label="Budget Buddy home">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <TicketCheck className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-normal">Budget Buddy</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <a
              href="#how"
              className="hidden rounded-full px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground sm:inline-flex"
            >
              How it helps
            </a>
            <Link
              href="/sign-in"
              className="rounded-full px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              Sign in
            </Link>
          </nav>
        </header>

        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-sm text-muted-foreground shadow-[0_10px_28px_oklch(0.22_0.02_80/0.06)]">
              <Sparkles className="size-4 text-primary" aria-hidden="true" />
              A calm pause before you spend
            </div>
            <h1 className="max-w-[12ch] text-5xl font-semibold leading-[0.95] tracking-normal text-balance sm:text-6xl lg:text-7xl">
              Pause before the purchase feels urgent.
            </h1>
            <p className="mt-6 max-w-[58ch] text-base leading-7 text-muted-foreground sm:text-lg">
              Budget Buddy gives students and tight-budget shoppers a friendly second opinion before impulse spending turns into next week&apos;s stress.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/app"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_18px_34px_oklch(0.22_0.02_80/0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_42px_oklch(0.22_0.02_80/0.18)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                Start checking a purchase
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href="#how"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-background/80 px-5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35"
              >
                See how it works
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -left-4 top-10 hidden rounded-3xl bg-[oklch(0.72_0.06_150)] px-4 py-3 text-sm font-medium text-[oklch(0.21_0.03_150)] shadow-[0_16px_32px_oklch(0.3_0.04_80/0.14)] lg:block">
              Quick check
            </div>
            <div className="relative rotate-[-1.5deg] rounded-[2rem] border border-border bg-card p-5 shadow-[0_24px_60px_oklch(0.22_0.02_80/0.14)]">
              <div className="absolute inset-y-12 -left-3 flex flex-col justify-between">
                <span className="size-6 rounded-full bg-background" />
                <span className="size-6 rounded-full bg-background" />
                <span className="size-6 rounded-full bg-background" />
              </div>
              <div className="absolute inset-y-12 -right-3 flex flex-col justify-between">
                <span className="size-6 rounded-full bg-background" />
                <span className="size-6 rounded-full bg-background" />
                <span className="size-6 rounded-full bg-background" />
              </div>

              <div className="rounded-[1.5rem] border border-dashed border-[oklch(0.83_0.02_78)] bg-[oklch(0.995_0.006_78)] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Purchase check</p>
                    <h2 className="mt-1 max-w-[18rem] text-2xl font-semibold leading-tight text-balance">
                      Should I buy $300 worth of concert tickets?
                    </h2>
                  </div>
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[oklch(0.91_0.044_150)] text-[oklch(0.39_0.07_150)]">
                    <TicketCheck className="size-6" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <div className="flex items-center justify-between rounded-2xl bg-background px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CircleDollarSign className="size-4" aria-hidden="true" />
                      After fixed costs
                    </span>
                    <span className="font-semibold">$420 left</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-background px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="size-4" aria-hidden="true" />
                      After tickets
                    </span>
                    <span className="font-semibold text-[oklch(0.55_0.15_32)]">$120 left</span>
                  </div>
                </div>

                <div className="mt-5 rounded-3xl border border-[oklch(0.82_0.05_150)] bg-[oklch(0.94_0.04_150)] p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[oklch(0.42_0.09_150)]" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[oklch(0.27_0.05_150)]">Maybe wait until Friday.</p>
                      <p className="mt-1 text-sm leading-6 text-[oklch(0.38_0.035_150)]">
                        You can still go, but waiting for the paycheck keeps the rest of the week less tight.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="how" className="mx-auto grid w-full max-w-7xl gap-3 pb-2 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-border bg-background/85 p-5 shadow-[0_12px_30px_oklch(0.22_0.02_80/0.06)]">
              <p className="text-sm font-semibold text-primary">0{index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-[oklch(0.97_0.012_82)] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">Built for dignity</p>
            <h2 className="mt-3 max-w-[12ch] text-4xl font-semibold leading-none text-balance">
              Money advice that does not scold.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {guardrails.map((item) => (
              <div key={item} className="flex min-h-32 flex-col justify-between rounded-3xl border border-border bg-background p-5 shadow-[0_10px_26px_oklch(0.22_0.02_80/0.05)]">
                <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
                <p className="text-sm font-medium leading-6">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
