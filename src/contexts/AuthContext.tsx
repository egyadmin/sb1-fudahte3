import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, AuthError } from '@supabase/supabase-js';
import { auth } from '../lib/supabase/auth';
import { useToast } from '../hooks/useToast';
import { useLanguage } from './LanguageContext';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const { showToast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { session, error } = await auth.getSession();
        if (error) throw error;
        setSession(session);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setError(error as AuthError);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setError(null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await auth.signIn(email, password);
      if (error) throw error;
      showToast(
        isRTL ? 'تم تسجيل الدخول بنجاح' : 'Successfully signed in',
        'success'
      );
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error as AuthError);
      showToast(
        isRTL ? 'خطأ في تسجيل الدخول' : 'Error signing in',
        'error'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await auth.signUp(email, password);
      if (error) throw error;
      showToast(
        isRTL ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully',
        'success'
      );
    } catch (error) {
      console.error('Sign up error:', error);
      setError(error as AuthError);
      showToast(
        isRTL ? 'خطأ في إنشاء الحساب' : 'Error creating account',
        'error'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await auth.signOut();
      if (error) throw error;
      setSession(null);
      showToast(
        isRTL ? 'تم تسجيل الخروج بنجاح' : 'Successfully signed out',
        'success'
      );
    } catch (error) {
      console.error('Sign out error:', error);
      setError(error as AuthError);
      showToast(
        isRTL ? 'خطأ في تسجيل الخروج' : 'Error signing out',
        'error'
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, loading, error, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};