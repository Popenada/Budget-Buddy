import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BudgetState {
  monthlyIncome: number;
  rent: number;
  gas: number;
  utilities: number;
  transportation: number;
  otherRecurring: number;

  totalMonthlyFixed: () => number;

  setMonthlyIncome: (value: number) => void;
  setRent: (value: number) => void;
  setGas: (value: number) => void;
  setUtilities: (value: number) => void;
  setTransportation: (value: number) => void;
  setOtherRecurring: (value: number) => void;
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set, get) => ({
      monthlyIncome: 0,
      rent: 0,
      gas: 0,
      utilities: 0,
      transportation: 0,
      otherRecurring: 0,
      
      // Total monthly fixed costs function return total costs as number
      totalMonthlyFixed: () => {
        const { rent, gas, utilities, transportation, otherRecurring } = get();
        return rent + gas + utilities + transportation + otherRecurring;
      },

      setMonthlyIncome: (value) => set({ monthlyIncome: value }),
      setRent: (value) => set({ rent: value }),
      setGas: (value) => set({ gas: value }),
      setUtilities: (value) => set({ utilities: value }),
      setTransportation: (value) => set({ transportation: value }),
      setOtherRecurring: (value) => set({ otherRecurring: value }),
    }),
    { name: "budget-buddy-store" }
  )
);