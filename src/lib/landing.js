import { supabase } from './supabase';

export const uploadLandingImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('landing-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('landing-images')
      .getPublicUrl(filePath);

    return { url: publicUrl, error: null };
  } catch (err) {
    console.error('Error uploading image:', err.message);
    return { url: null, error: err.message };
  }
};

export const getLandingContent = async () => {
  try {
    const { data, error } = await supabase
      .from('landing_content')
      .select('*');

    if (error) throw error;

    // Transform array into object with section as key
    const content = data.reduce((acc, item) => {
      acc[item.section] = item.content;
      return acc;
    }, {});

    return { data: content, error: null };
  } catch (err) {
    console.error('Error fetching landing content:', err.message);
    return { data: null, error: err.message };
  }
};

export const updateLandingContent = async (section, content) => {
  try {
    const { data, error } = await supabase
      .from('landing_content')
      .update({ content })
      .eq('section', section)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('Error updating landing content:', err.message);
    return { data: null, error: err.message };
  }
};