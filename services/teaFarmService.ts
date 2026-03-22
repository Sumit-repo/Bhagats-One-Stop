import { supabase } from '@/lib/supabase';
import { TeaFarmExpense, TeaFarmEarning, TeaFarmSummary, FinanceEntry } from '@/models/TeaFarm';

// In-memory fallback data for local testing
let mockExpenses: TeaFarmExpense[] = [
  { id: '1', category: 'labour', amount: 5000, date: new Date().toISOString().split('T')[0], notes: 'Initial labor', created_at: new Date().toISOString() },
];
let mockEarnings: TeaFarmEarning[] = [
  { id: '1', quantity_kg: 50, price_per_kg: 200, total_amount: 10000, date: new Date().toISOString().split('T')[0], notes: 'Initial sale', created_at: new Date().toISOString() },
];

export class TeaFarmService {
  async getSummary(): Promise<TeaFarmSummary> {
    if (!supabase) {
      const totalInvestment = mockExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
      const totalEarnings = mockEarnings.reduce((sum, earn) => sum + Number(earn.total_amount), 0);
      const profitLoss = totalEarnings - totalInvestment;

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const monthlyExpenses = mockExpenses.filter(exp => new Date(exp.date) >= thirtyDaysAgo);
      const monthlyTrend = monthlyExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
      
      return { total_investment: totalInvestment, total_earnings: totalEarnings, profit_loss: profitLoss, monthly_trend: monthlyTrend };
    }

    const [expensesData, earningsData] = await Promise.all([
      supabase.from('tea_farm_expenses').select('amount'),
      supabase.from('tea_farm_earnings').select('total_amount'),
    ]);

    const totalInvestment = expensesData.data?.reduce((sum: number, exp: any) => sum + Number(exp.amount), 0) || 0;
    const totalEarnings = earningsData.data?.reduce((sum: number, earn: any) => sum + Number(earn.total_amount), 0) || 0;
    const profitLoss = totalEarnings - totalInvestment;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: monthlyExpenses } = await supabase
      .from('tea_farm_expenses')
      .select('amount')
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0]);

    const monthlyTrend = monthlyExpenses?.reduce((sum: number, exp: any) => sum + Number(exp.amount), 0) || 0;

    return {
      total_investment: totalInvestment,
      total_earnings: totalEarnings,
      profit_loss: profitLoss,
      monthly_trend: monthlyTrend,
    };
  }

  async getAllExpenses(): Promise<TeaFarmExpense[]> {
    if (!supabase) return [...mockExpenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const { data, error } = await supabase
      .from('tea_farm_expenses')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getAllEarnings(): Promise<TeaFarmEarning[]> {
    if (!supabase) return [...mockEarnings].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const { data, error } = await supabase
      .from('tea_farm_earnings')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async addExpense(expense: Omit<TeaFarmExpense, 'id' | 'created_at'>): Promise<TeaFarmExpense> {
    if (!supabase) {
      const newExpense = { ...expense, id: Date.now().toString(), created_at: new Date().toISOString() };
      mockExpenses.push(newExpense);
      return newExpense;
    }
    
    const { data, error } = await supabase
      .from('tea_farm_expenses')
      .insert([expense])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async addEarning(earning: Omit<TeaFarmEarning, 'id' | 'created_at'>): Promise<TeaFarmEarning> {
    if (!supabase) {
      const newEarning = { ...earning, id: Date.now().toString(), created_at: new Date().toISOString() };
      mockEarnings.push(newEarning);
      return newEarning;
    }
    
    const { data, error } = await supabase
      .from('tea_farm_earnings')
      .insert([earning])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteExpense(id: string): Promise<void> {
    if (!supabase) {
      mockExpenses = mockExpenses.filter(e => e.id !== id);
      return;
    }
    
    const { error } = await supabase
      .from('tea_farm_expenses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async deleteEarning(id: string): Promise<void> {
    if (!supabase) {
      mockEarnings = mockEarnings.filter(e => e.id !== id);
      return;
    }
    
    const { error } = await supabase
      .from('tea_farm_earnings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getMonthlyData(): Promise<{ month: string; expenses: number; earnings: number }[]> {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();

    if (!supabase) {
      return months.map((month, index) => {
        const expenses = mockExpenses.filter(exp => {
          const expDate = new Date(exp.date);
          return expDate.getMonth() === index && expDate.getFullYear() === currentYear;
        }).reduce((sum, exp) => sum + Number(exp.amount), 0);
        const earnings = mockEarnings.filter(earn => {
          const earnDate = new Date(earn.date);
          return earnDate.getMonth() === index && earnDate.getFullYear() === currentYear;
        }).reduce((sum, earn) => sum + Number(earn.total_amount), 0);
        return { month, expenses, earnings };
      });
    }

    const [expensesData, earningsData] = await Promise.all([
      supabase.from('tea_farm_expenses').select('amount, date'),
      supabase.from('tea_farm_earnings').select('total_amount, date'),
    ]);

    const monthlyData = months.map((month, index) => {
      const expenses = expensesData.data?.filter((exp: any) => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === index && expDate.getFullYear() === currentYear;
      }).reduce((sum: number, exp: any) => sum + Number(exp.amount), 0) || 0;

      const earnings = earningsData.data?.filter((earn: any) => {
        const earnDate = new Date(earn.date);
        return earnDate.getMonth() === index && earnDate.getFullYear() === currentYear;
      }).reduce((sum: number, earn: any) => sum + Number(earn.total_amount), 0) || 0;

      return { month, expenses, earnings };
    });

    return monthlyData;
  }
}
