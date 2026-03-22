'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { CustomerTable } from '@/components/customers/CustomerTable';
import { AddCustomerModal } from '@/components/customers/AddCustomerModal';
import { useCustomers } from '@/hooks/useCustomers';
import { Users, UserPlus } from 'lucide-react';

export default function CustomersPage() {
  const { customers, loading, applyFilters, addCustomer } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
        <Sidebar />
        <div className="flex-1 p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Customers
                </h1>
                <p className="text-gray-500 dark:text-slate-400 mt-2 font-medium">CRM at Bhagat&apos;s One-Stop</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-[2rem] font-black text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 dark:shadow-none hover:scale-[1.02] active:scale-95"
                >
                  <UserPlus className="w-6 h-6" />
                  Add Customer
                </button>
              </div>
            </div>

            <CustomerTable 
              customers={customers} 
              onFilter={applyFilters}
            />
          </div>
        </main>
      </div>

      <AddCustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addCustomer} 
      />
    </div>
  );
}
