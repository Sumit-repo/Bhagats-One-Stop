import { SupariFarmExpense, SupariFarmEarning, SupariFarmSummary } from '@/models/SupariFarm';

export class SupariFarmService {
  async getSummary(): Promise<SupariFarmSummary> {
    const [expensesRes, earningsRes] = await Promise.all([
      fetch('/api/supari-farm/expenses'),
      fetch('/api/supari-farm/earnings'),
    ]);

    const expenses: SupariFarmExpense[] = expensesRes.ok ? await expensesRes.json() : [];
    const earnings: SupariFarmEarning[] = earningsRes.ok ? await earningsRes.json() : [];

    const totalInvestment = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalEarnings = earnings.reduce((sum, e) => sum + Number(e.total_amount), 0);
    const profitLoss = totalEarnings - totalInvestment;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyExpenses = expenses.filter(e => new Date(e.date) >= thirtyDaysAgo);
    const monthlyTrend = monthlyExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

    return { total_investment: totalInvestment, total_earnings: totalEarnings, profit_loss: profitLoss, monthly_trend: monthlyTrend };
  }

  async getAllExpenses(): Promise<SupariFarmExpense[]> {
    const res = await fetch('/api/supari-farm/expenses');
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async getAllEarnings(): Promise<SupariFarmEarning[]> {
    const res = await fetch('/api/supari-farm/earnings');
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async addExpense(expense: Omit<SupariFarmExpense, 'id' | 'created_at'>): Promise<SupariFarmExpense> {
    const res = await fetch('/api/supari-farm/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async addEarning(earning: Omit<SupariFarmEarning, 'id' | 'created_at'>): Promise<SupariFarmEarning> {
    const res = await fetch('/api/supari-farm/earnings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(earning),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async updateExpense(id: string, data: Partial<Omit<SupariFarmExpense, 'id' | 'created_at'>>): Promise<SupariFarmExpense> {
    const res = await fetch(`/api/supari-farm/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async updateEarning(id: string, data: Partial<Omit<SupariFarmEarning, 'id' | 'created_at'>>): Promise<SupariFarmEarning> {
    const res = await fetch(`/api/supari-farm/earnings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async deleteExpense(id: string): Promise<void> {
    const res = await fetch(`/api/supari-farm/expenses/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
  }

  async deleteEarning(id: string): Promise<void> {
    const res = await fetch(`/api/supari-farm/earnings/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
  }

  async getMonthlyData(): Promise<{ month: string; expenses: number; earnings: number }[]> {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();

    const [expensesData, earningsData] = await Promise.all([
      this.getAllExpenses(),
      this.getAllEarnings(),
    ]);

    return months.map((month, index) => {
      const expenses = expensesData
        .filter(exp => { const d = new Date(exp.date); return d.getMonth() === index && d.getFullYear() === currentYear; })
        .reduce((sum, exp) => sum + Number(exp.amount), 0);
      const earnings = earningsData
        .filter(earn => { const d = new Date(earn.date); return d.getMonth() === index && d.getFullYear() === currentYear; })
        .reduce((sum, earn) => sum + Number(earn.total_amount), 0);
      return { month, expenses, earnings };
    });
  }
}
