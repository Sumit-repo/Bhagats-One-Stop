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

  useEffect(() => {
    loadCustomers();
  }, []);

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
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        (c.email && c.email.toLowerCase().includes(q))
      );
    }
    setFilteredCustomers(result);
  };

  const addCustomer = (newCustomer: Customer) => {
    setCustomers(prev => [newCustomer, ...prev]);
    setFilteredCustomers(prev => [newCustomer, ...prev]);
  };

  return { customers: filteredCustomers, loading, error, refresh: loadCustomers, applyFilters, addCustomer };
}
