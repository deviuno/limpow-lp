import { supabase } from './supabase';

export const getSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching settings:', err.message);
    return { data: null, error: err.message };
  }
};

export const updateSettings = async (settings) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error) throw error;

    const { error: updateError } = await supabase
      .from('settings')
      .update(settings)
      .eq('id', data.id);

    if (updateError) throw updateError;

    return { data, error: null };
  } catch (err) {
    console.error('Error updating settings:', err.message);
    return { data: null, error: err.message };
  }
};