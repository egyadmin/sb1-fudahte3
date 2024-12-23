import { supabase } from '../../client';
import { handleApiError } from './error';

export const getTableQuery = (table: string) => {
  return supabase.from(table).select('*');
};

export const insertRow = async <T extends Record<string, any>>(
  table: string,
  data: T
) => {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateRow = async <T extends Record<string, any>>(
  table: string,
  id: string,
  data: Partial<T>
) => {
  try {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  } catch (error) {
    handleApiError(error);
  }
};