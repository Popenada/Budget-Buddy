"use client";

import { useBudgetStore } from "@/app/store/useBudgetStore";

type BudgetKey = "monthlyIncome" | "rent" | "gas" | "utilities" | "transportation" | "otherRecurring";

const FIELDS: { key: BudgetKey; label: string; placeholder: string }[] = [
  { key: "monthlyIncome", label: "Monthly Income", placeholder: "5000" },
  { key: "rent", label: "Rent / Mortgage", placeholder: "1500" },
  { key: "gas", label: "Gas", placeholder: "80" },
  { key: "utilities", label: "Utilities", placeholder: "120" },
  { key: "transportation", label: "Transportation", placeholder: "150" },
  { key: "otherRecurring", label: "Other Recurring Costs", placeholder: "200" },
];

const SETTERS: Record<BudgetKey, "setMonthlyIncome" | "setRent" | "setGas" | "setUtilities" | "setTransportation" | "setOtherRecurring"> = {
  monthlyIncome: "setMonthlyIncome",
  rent: "setRent",
  gas: "setGas",
  utilities: "setUtilities",
  transportation: "setTransportation",
  otherRecurring: "setOtherRecurring",
};

export function BudgetForm() {
  const store = useBudgetStore();
  const totalFixed = store.totalMonthlyFixed();
  const leftover = store.monthlyIncome - totalFixed;

  function handleChange(key: BudgetKey, value: string) {
    store[SETTERS[key]](Number(value) || 0);
  }

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl border border-border bg-card">
      <div>
        <h2 className="text-sm font-semibold text-foreground">Monthly Budget</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Auto-saved to your device</p>
      </div>

      <div className="flex flex-col gap-3">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground">{label}</label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
              <input
                type="number"
                min="0"
                placeholder={placeholder}
                value={store[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full rounded-lg border border-border bg-background pl-6 pr-3 py-1.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1 pt-2 border-t border-border text-xs text-muted-foreground">
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
