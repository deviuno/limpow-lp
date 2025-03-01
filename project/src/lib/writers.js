import { supabase } from './supabase';

export const getWriters = async () => {
  try {
    const { data, error } = await supabase
      .from('writers_profiles')
      .select(`
        *,
        generation_settings(*)
      `)
      .order('created_at');

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching writers:', err.message);
    return { data: null, error: err.message };
  }
};

export const getWriter = async (id) => {
  try {
    const { data, error } = await supabase
      .from('writers_profiles')
      .select(`
        *,
        generation_settings(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error fetching writer:', err.message);
    return { data: null, error: err.message };
  }
};

export const createWriter = async (writerData) => {
  try {
    const { data, error } = await supabase
      .from('writers_profiles')
      .insert([writerData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error creating writer:', err.message);
    return { data: null, error: err.message };
  }
};

export const updateWriter = async (id, writerData) => {
  try {
    const { data, error } = await supabase
      .from('writers_profiles')
      .update(writerData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error updating writer:', err.message);
    return { data: null, error: err.message };
  }
};

export const deleteWriter = async (id) => {
  try {
    const { error } = await supabase
      .from('writers_profiles')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.error('Error deleting writer:', err.message);
    return { error: err.message };
  }
};

export const recordGeneration = async (writerId, prompt, result, metadata = {}) => {
  try {
    const { error } = await supabase
      .from('generation_history')
      .insert([{
        writer_id: writerId,
        prompt,
        result,
        metadata
      }]);

    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.error('Error recording generation:', err.message);
    return { error: err.message };
  }
};