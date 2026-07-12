'use client';

import { useState, useEffect } from 'react';
import { SupariFarmService } from '@/services/supariFarmService';
import { SupariFarmExpense, SupariFarmEarning, SupariFarmSummary, SupariFinanceEntry } from '@/models/SupariFarm';

const supariFarmService = new SupariFarmService();

export function useSupariFarm() {
  const [summary, setSummary] = useState<SupariFarmSummary | null>(null);
  const [expenses, setExpenses] = useState<SupariFarmExpense[]>([]);
  const [earnings, setEarnings] = useState<SupariFarmEarning[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; expenses: number; earnings: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [summaryData, expensesData, earningsData, monthly] = await Promise.all([
        supariFarmService.getSummary(),
        supariFarmService.getAllExpenses(),
        supariFarmService.getAllEarnings(),
        supariFarmService.getMonthlyData(),
      ]);
      setSummary(summaryData);
      setExpenses(expensesData);
      setEarnings(earningsData);
      setMonthlyData(monthly);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entry: SupariFinanceEntry) => {
    try {
      if (entry.type === 'expense') {
        await supariFarmService.addExpense({
          category: entry.category!,
          amount: entry.amount,
          date: entry.date,
          notes: entry.notes,
        });
      } else {
        await supariFarmService.addEarning({
          quantity_kg: entry.quantity_kg!,
          price_per_kg: entry.price_per_kg!,
          total_amount: entry.amount,
          date: entry.date,
          notes: entry.notes,
        });
      }
      await loadData();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await supariFarmService.deleteExpense(id);
      await loadData();
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteEarning = async (id: string) => {
    try {
      await supariFarmService.deleteEarning(id);
      await loadData();
    } catch (err) {
      setError(err as Error);
    }
  };

  return {
    summary,
    expenses,
    earnings,
    monthlyData,
    loading,
    error,
    addEntry,
    deleteExpense,
    deleteEarning,
    refresh: loadData,
  };
}
