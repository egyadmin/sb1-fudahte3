import { supabase } from './client';

export const financeApi = {
  // Budget Management
  async getBudgetCategories() {
    return await supabase
      .from('finance_budget_categories')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async addBudgetCategory(data: {
    nameEn: string;
    nameAr: string;
    allocated: number;
    fiscalYear: string;
  }) {
    return await supabase
      .from('finance_budget_categories')
      .insert([{
        name_en: data.nameEn,
        name_ar: data.nameAr,
        allocated_amount: data.allocated,
        fiscal_year: data.fiscalYear,
        spent_amount: 0
      }])
      .select()
      .single();
  },

  // Transactions
  async getTransactions() {
    return await supabase
      .from('finance_transactions')
      .select(`
        *,
        category:finance_budget_categories(*)
      `)
      .order('transaction_date', { ascending: false });
  },

  async addTransaction(data: {
    typeEn: string;
    typeAr: string;
    amount: number;
    categoryId: string;
    descriptionEn?: string;
    descriptionAr?: string;
    transactionDate: string;
  }) {
    return await supabase
      .from('finance_transactions')
      .insert([{
        type_en: data.typeEn,
        type_ar: data.typeAr,
        amount: data.amount,
        category_id: data.categoryId,
        description_en: data.descriptionEn,
        description_ar: data.descriptionAr,
        transaction_date: data.transactionDate
      }])
      .select()
      .single();
  },

  // Financial Reports
  async getFinancialReports() {
    return await supabase
      .from('finance_reports')
      .select('*')
      .order('created_at', { ascending: false });
  },

  async generateReport(data: {
    titleEn: string;
    titleAr: string;
    typeEn: string;
    typeAr: string;
    startDate: string;
    endDate: string;
  }) {
    return await supabase
      .from('finance_reports')
      .insert([{
        title_en: data.titleEn,
        title_ar: data.titleAr,
        type_en: data.typeEn,
        type_ar: data.typeAr,
        start_date: data.startDate,
        end_date: data.endDate,
        status: 'generated'
      }])
      .select()
      .single();
  }
};