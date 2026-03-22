import { supabase } from '@/lib/supabase';
import { TeaFarmExpense, TeaFarmEarning, TeaFarmSummary, FinanceEntry } from '@/models/TeaFarm';

export class TeaFarmService {
  async getSummary(): Promise<TeaFarmSummary> {
    const [expensesData, earningsData] = await Promise.all([
      supabase.from('tea_farm_expenses').select('amount'),
      supabase.from('tea_farm_earnings').select('total_amount'),
    ]);

    const totalInvestment = expensesData.data?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;
    const totalEarnings = earningsData.data?.reduce((sum, earn) => sum + Number(earn.total_amount), 0) || 0;
    const profitLoss = totalEarnings - totalInvestment;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: monthlyExpenses } = await supabase
      .from('tea_farm_expenses')
      .select('amount')
      .gte('date', thirtyDaysAgo.toISOString().split('T')[0]);

    const monthlyTrend = monthlyExpenses?.reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;

    return {
      total_investment: totalInvestment,
      total_earnings: totalEarnings,
      profit_loss: profitLoss,
      monthly_trend: monthlyTrend,
    };
  }

  async getAllExpenses(): Promise<TeaFarmExpense[]> {
    const { data, error } = await supabase
      .from('tea_farm_expenses')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async getAllEarnings(): Promise<TeaFarmEarning[]> {
    const { data, error } = await supabase
      .from('tea_farm_earnings')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async addExpense(expense: Omit<TeaFarmExpense, 'id' | 'created_at'>): Promise<TeaFarmExpense> {
    const { data, error } = await supabase
      .from('tea_farm_expenses')
      .insert([expense])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async addEarning(earning: Omit<TeaFarmEarning, 'id' | 'created_at'>): Promise<TeaFarmEarning> {
    const { data, error } = await supabase
      .from('tea_farm_earnings')
      .insert([earning])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteExpense(id: string): Promise<void> {
    const { error } = await supabase
      .from('tea_farm_expenses')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async deleteEarning(id: string): Promise<void> {
    const { error } = await supabase
      .from('tea_farm_earnings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async getMonthlyData(): Promise<{ month: string; expenses: number; earnings: number }[]> {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();

    const [expensesData, earningsData] = await Promise.all([
      supabase.from('tea_farm_expenses').select('amount, date'),
      supabase.from('tea_farm_earnings').select('total_amount, date'),
    ]);

    const monthlyData = months.map((month, index) => {
      const expenses = expensesData.data?.filter(exp => {
        const expDate = new Date(exp.date);
        return expDate.getMonth() === index && expDate.getFullYear() === currentYear;
      }).reduce((sum, exp) => sum + Number(exp.amount), 0) || 0;

      const earnings = earningsData.data?.filter(earn => {
        const earnDate = new Date(earn.date);
        return earnDate.getMonth() === index && earnDate.getFullYear() === currentYear;
      }).reduce((sum, earn) => sum + Number(earn.total_amount), 0) || 0;

      return { month, expenses, earnings };
    });

    return monthlyData;
  }
}
