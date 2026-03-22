import { TeaFarmExpense, TeaFarmEarning, TeaFarmSummary } from '@/models/TeaFarm';

export class TeaFarmService {
  async getSummary(): Promise<TeaFarmSummary> {
    const [expensesRes, earningsRes] = await Promise.all([
      fetch('/api/tea-farm/expenses'),
      fetch('/api/tea-farm/earnings'),
    ]);

    const expenses: TeaFarmExpense[] = expensesRes.ok ? await expensesRes.json() : [];
    const earnings: TeaFarmEarning[] = earningsRes.ok ? await earningsRes.json() : [];

    const totalInvestment = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    const totalEarnings = earnings.reduce((sum, e) => sum + Number(e.total_amount), 0);
    const profitLoss = totalEarnings - totalInvestment;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyExpenses = expenses.filter(e => new Date(e.date) >= thirtyDaysAgo);
    const monthlyTrend = monthlyExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

    return { total_investment: totalInvestment, total_earnings: totalEarnings, profit_loss: profitLoss, monthly_trend: monthlyTrend };
  }

  async getAllExpenses(): Promise<TeaFarmExpense[]> {
    const res = await fetch('/api/tea-farm/expenses');
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async getAllEarnings(): Promise<TeaFarmEarning[]> {
    const res = await fetch('/api/tea-farm/earnings');
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async addExpense(expense: Omit<TeaFarmExpense, 'id' | 'created_at'>): Promise<TeaFarmExpense> {
    const res = await fetch('/api/tea-farm/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async addEarning(earning: Omit<TeaFarmEarning, 'id' | 'created_at'>): Promise<TeaFarmEarning> {
    const res = await fetch('/api/tea-farm/earnings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(earning),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async deleteExpense(id: string): Promise<void> {
    const res = await fetch(`/api/tea-farm/expenses/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(await res.text());
  }

  async deleteEarning(id: string): Promise<void> {
    const res = await fetch(`/api/tea-farm/earnings/${id}`, { method: 'DELETE' });
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
