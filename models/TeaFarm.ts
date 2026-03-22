export type ExpenseCategory = 'labour' | 'fertilizers' | 'maintenance' | 'miscellaneous';

export interface TeaFarmExpense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  notes?: string;
  created_at: string;
}

export interface TeaFarmEarning {
  id: string;
  quantity_kg: number;
  price_per_kg: number;
  total_amount: number;
  date: string;
  notes?: string;
  created_at: string;
}

export interface TeaFarmSummary {
  total_investment: number;
  total_earnings: number;
  profit_loss: number;
  monthly_trend: number;
}

export interface FinanceEntry {
  type: 'expense' | 'earning';
  category?: ExpenseCategory;
  amount: number;
  quantity_kg?: number;
  price_per_kg?: number;
  date: string;
  notes?: string;
}
