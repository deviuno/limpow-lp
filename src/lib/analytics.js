import { supabase } from './supabase';

export const recordCTAClick = async (location, text) => {
  try {
    const { error } = await supabase
      .from('cta_clicks')
      .insert([{ cta_location: location, cta_text: text }]);

    if (error) throw error;
  } catch (err) {
    console.error('Error recording CTA click:', err.message);
  }
};