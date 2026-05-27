import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BudgetState {
  monthlyIncome: number;
  rent: number;
  gas: number;
  utilities: number;
  transportation: number;
  groceries: number;
  phone: number;
  insurance: number;
  debtPayments: number;
  otherRecurring: number;

  totalMonthlyFixed: () => number;

  setMonthlyIncome: (value: number) => void;
  setRent: (value: number) => void;
  setGas: (value: number) => void;
  setUtilities: (value: number) => void;
  setTransportation: (value: number) => void;
  setGroceries: (value: number) => void;
  setPhone: (value: number) => void;
  setInsurance: (value: number) => void;
  setDebtPayments: (value: number) => void;
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
      groceries: 0,
      phone: 0,
      insurance: 0,
      debtPayments: 0,
      otherRecurring: 0,

      totalMonthlyFixed: () => {
        const { rent, gas, utilities, transportation, groceries, phone, insurance, debtPayments, otherRecurring } = get();
        return rent + gas + utilities + transportation + groceries + phone + insurance + debtPayments + otherRecurring;
      },

      setMonthlyIncome: (value) => set({ monthlyIncome: value }),
      setRent: (value) => set({ rent: value }),
      setGas: (value) => set({ gas: value }),
      setUtilities: (value) => set({ utilities: value }),
      setTransportation: (value) => set({ transportation: value }),
      setGroceries: (value) => set({ groceries: value }),
      setPhone: (value) => set({ phone: value }),
      setInsurance: (value) => set({ insurance: value }),
      setDebtPayments: (value) => set({ debtPayments: value }),
      setOtherRecurring: (value) => set({ otherRecurring: value }),
    }),
    { name: "budget-buddy-store" }
  )
);