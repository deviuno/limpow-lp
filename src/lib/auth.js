import { supabase } from './supabase';

const ADMIN_EMAIL = 'admin@limpow.com.br';

export const initAuth = () => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      const userData = {
        id: session.user.id,
        email: session.user.email,
        name: 'Rodrigo',
        phone: '11998058119',
        role: 'admin'
      };
      localStorage.setItem('adminUser', JSON.stringify(userData));
    } else if (event === 'SIGNED_OUT') {
      localStorage.removeItem('adminUser');
    }
  });

  // Check for existing session on init
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      const userData = {
        id: session.user.id,
        email: session.user.email,
        name: 'Rodrigo',
        phone: '11998058119',
        role: 'admin'
      };
      localStorage.setItem('adminUser', JSON.stringify(userData));
    }
  });
};

export const authenticateAdmin = async (email, password) => {
  try {
    if (email !== ADMIN_EMAIL) {
      return { user: null, error: 'Email não autorizado' };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { user: null, error: error.message };
    }
    
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return { user: null, error: 'Erro ao autenticar' };
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  try {
    // Primeiro verifica a senha atual
    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password: currentPassword
    });

    if (signInError) {
      return { success: false, error: 'Senha atual incorreta' };
    }

    // Atualiza para a nova senha
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (updateError) {
      return { success: false, error: updateError.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    return { success: false, error: 'Erro ao alterar senha' };
  }
};

export const isAuthenticated = () => {
  try {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return null;
  }
};

export const logout = async () => {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem('adminUser');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};