import { supabase } from '@/lib/supabase';
import { Customer } from '@/models/Customer';
import { MOCK_CUSTOMERS } from '@/lib/mockData';

export class CustomerService {
  async getAllCustomers(): Promise<Customer[]> {
    if (!supabase) {
      return MOCK_CUSTOMERS;
    }

    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data || [];
  }
}
