'use client';

import { useState, useEffect } from 'react';
import { TeaFarmService } from '@/services/teaFarmService';
import { TeaFarmExpense, TeaFarmEarning, TeaFarmSummary, FinanceEntry } from '@/models/TeaFarm';

const teaFarmService = new TeaFarmService();

export function useTeaFarm() {
  const [summary, setSummary] = useState<TeaFarmSummary | null>(null);
  const [expenses, setExpenses] = useState<TeaFarmExpense[]>([]);
  const [earnings, setEarnings] = useState<TeaFarmEarning[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ month: string; expenses: number; earnings: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadTeaFarmData();
  }, []);

  const loadTeaFarmData = async () => {
    try {
      setLoading(true);
      const [summaryData, expensesData, earningsData, monthly] = await Promise.all([
        teaFarmService.getSummary(),
        teaFarmService.getAllExpenses(),
        teaFarmService.getAllEarnings(),
        teaFarmService.getMonthlyData(),
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

  const addEntry = async (entry: FinanceEntry) => {
    try {
      if (entry.type === 'expense') {
        await teaFarmService.addExpense({
          category: entry.category!,
          amount: entry.amount,
          date: entry.date,
          notes: entry.notes,
        });
      } else {
        await teaFarmService.addEarning({
          quantity_kg: entry.quantity_kg!,
          price_per_kg: entry.price_per_kg!,
          total_amount: entry.amount,
          date: entry.date,
          notes: entry.notes,
        });
      }
      await loadTeaFarmData();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await teaFarmService.deleteExpense(id);
      await loadTeaFarmData();
    } catch (err) {
      setError(err as Error);
    }
  };

  const deleteEarning = async (id: string) => {
    try {
      await teaFarmService.deleteEarning(id);
      await loadTeaFarmData();
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
    refresh: loadTeaFarmData,
  };
}
