'use client';

import { useState, useEffect } from 'react';
import { CustomerService } from '@/services/customerService';
import { Customer } from '@/models/Customer';

const customerService = new CustomerService();

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => { loadCustomers(); }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (filters: { search?: string }) => {
    let result = [...customers];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || (c.email && c.email.toLowerCase().includes(q)));
    }
    setFilteredCustomers(result);
  };

  const addCustomer = async (newCustomer: Omit<Customer, 'id' | 'created_at'>) => {
    const created = await customerService.createCustomer(newCustomer);
    setCustomers(prev => [created, ...prev]);
    setFilteredCustomers(prev => [created, ...prev]);
    return created;
  };

  const updateCustomer = async (updated: Customer) => {
    const saved = await customerService.updateCustomer(updated.id, { name: updated.name, email: updated.email });
    setCustomers(prev => prev.map(c => c.id === saved.id ? saved : c));
    setFilteredCustomers(prev => prev.map(c => c.id === saved.id ? saved : c));
  };

  const deleteCustomer = async (id: string) => {
    await customerService.deleteCustomer(id);
    setCustomers(prev => prev.filter(c => c.id !== id));
    setFilteredCustomers(prev => prev.filter(c => c.id !== id));
  };

  return { customers: filteredCustomers, loading, error, refresh: loadCustomers, applyFilters, addCustomer, updateCustomer, deleteCustomer };
}
