"use client";

import { useEffect, useState } from "react";
import { useBudgetStore } from "@/app/store/useBudgetStore";
import { CircleDollarSign, ReceiptText } from "lucide-react";

type BudgetKey =
  | "monthlyIncome"
  | "rent"
  | "gas"
  | "utilities"
  | "transportation"
  | "groceries"
  | "phone"
  | "insurance"
  | "debtPayments"
  | "otherRecurring";

const FIELDS: { key: BudgetKey; label: string; placeholder: string }[] = [
  { key: "monthlyIncome", label: "Monthly Income", placeholder: "5000" },
  { key: "rent", label: "Rent / Mortgage", placeholder: "1500" },
  { key: "gas", label: "Gas", placeholder: "80" },
  { key: "utilities", label: "Utilities", placeholder: "120" },
  { key: "transportation", label: "Transportation", placeholder: "150" },
  { key: "groceries", label: "Groceries / Food", placeholder: "400" },
  { key: "phone", label: "Phone Bill", placeholder: "80" },
  { key: "insurance", label: "Insurance", placeholder: "200" },
  { key: "debtPayments", label: "Debt Payments", placeholder: "300" },
  { key: "otherRecurring", label: "Other Recurring", placeholder: "100" },
];

const SETTERS: Record<BudgetKey, keyof ReturnType<typeof useBudgetStore.getState>> = {
  monthlyIncome: "setMonthlyIncome",
  rent: "setRent",
  gas: "setGas",
  utilities: "setUtilities",
  transportation: "setTransportation",
  groceries: "setGroceries",
  phone: "setPhone",
  insurance: "setInsurance",
  debtPayments: "setDebtPayments",
  otherRecurring: "setOtherRecurring",
};

export function BudgetForm() {
  const store = useBudgetStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch with persisted Zustand state
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const totalFixed = mounted ? store.totalMonthlyFixed() : 0;
  const leftover = mounted ? store.monthlyIncome - totalFixed : 0;
  const usedPercent =
    mounted && store.monthlyIncome > 0
      ? Math.min(100, Math.round((totalFixed / store.monthlyIncome) * 100))
      : 0;

  function handleChange(key: BudgetKey, value: string) {
    (store[SETTERS[key]] as (v: number) => void)(Number(value) || 0);
  }

  return (
    <div className="flex flex-col gap-5 rounded-[1.75rem] border border-border bg-card p-4 shadow-[0_16px_38px_oklch(0.22_0.02_80/0.07)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Auto-saved budget</p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">Monthly basics</h2>
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary">
          <ReceiptText className="size-5" aria-hidden="true" />
        </span>
      </div>

      <div className="rounded-3xl border border-border bg-background p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Left after fixed costs</p>
            <p className={`mt-1 text-2xl font-semibold ${leftover >= 0 ? "text-foreground" : "text-destructive"}`}>
              ${leftover.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Used</p>
            <p className="mt-1 text-sm font-semibold text-foreground">{usedPercent}%</p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full ${leftover >= 0 ? "bg-primary" : "bg-destructive"}`}
            style={{ width: `${usedPercent}%` }}
          />
        </div>
      </div>

      <div className="grid gap-3">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key} className="flex flex-col gap-1">
            <label htmlFor={key} className="text-xs font-medium text-muted-foreground">
              {label}
            </label>
            <div className="relative">
              <CircleDollarSign className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                id={key}
                type="number"
                inputMode="decimal"
                min="0"
                placeholder={placeholder}
                value={store[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="min-h-10 w-full rounded-2xl border border-border bg-background pl-8 pr-3 text-sm outline-none transition placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/30 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Fixed costs</span>
          <span className="font-medium text-foreground">${totalFixed.toLocaleString()}/mo</span>
        </div>
        <div className="flex justify-between">
          <span>Leftover</span>
          <span className={`font-semibold ${leftover >= 0 ? "text-green-600" : "text-destructive"}`}>
            ${leftover.toLocaleString()}/mo
          </span>
        </div>
      </div>
    </div>
  );
}
