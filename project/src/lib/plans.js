import { supabase } from './supabase';

export const getPlans = async () => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('price');

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching plans:', err.message);
    return { data: null, error: err.message };
  }
};

export const createPlan = async (planData) => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .insert([planData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error creating plan:', err.message);
    return { data: null, error: err.message };
  }
};

export const updatePlan = async (id, planData) => {
  try {
    const { data, error } = await supabase
      .from('plans')
      .update(planData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error updating plan:', err.message);
    return { data: null, error: err.message };
  }
};

export const deletePlan = async (id) => {
  try {
    const { error } = await supabase
      .from('plans')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.error('Error deleting plan:', err.message);
    return { error: err.message };
  }
};