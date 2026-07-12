export type SupariExpenseCategory =
  | 'planting'
  | 'labour'
  | 'fertilizers'
  | 'pesticides'
  | 'maintenance'
  | 'miscellaneous';

export interface SupariFarmExpense {
  id: string;
  category: SupariExpenseCategory;
  amount: number;
  date: string;
  notes?: string;
  created_at: string;
}

export interface SupariFarmEarning {
  id: string;
  quantity_kg: number;
  price_per_kg: number;
  total_amount: number;
  date: string;
  notes?: string;
  created_at: string;
}

export interface SupariFarmSummary {
  total_investment: number;
  total_earnings: number;
  profit_loss: number;
  monthly_trend: number;
}

export interface SupariFinanceEntry {
  type: 'expense' | 'earning';
  category?: SupariExpenseCategory;
  amount: number;
  quantity_kg?: number;
  price_per_kg?: number;
  date: string;
  notes?: string;
}
