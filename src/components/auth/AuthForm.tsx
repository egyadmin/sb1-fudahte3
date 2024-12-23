import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import { Building2, LogIn, UserPlus, Mail, Lock } from 'lucide-react';
import { AuthFeatures } from './features/AuthFeatures';
import { AuthFormFields } from './form/AuthFormFields';

export const AuthForm: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const { language } = useLanguage();
  const { showToast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const isRTL = language === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        showToast(isRTL ? 'تم تسجيل الدخول بنجاح' : 'Successfully signed in', 'success');
      } else {
        await signUp(formData.email, formData.password);
        showToast(isRTL ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully', 'success');
      }
    } catch (error) {
      showToast(
        isRTL ? 'حدث خطأ أثناء المصادقة' : 'Authentication error occurred',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80"
            alt="Construction Operations"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/50 to-primary-900/90" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white bg-opacity-10 rounded-xl shadow-soft">
                <Building2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">
              {isRTL ? 'نظام إدارة العمليات' : 'Operations Management'}
            </h2>
            <p className="mt-2 text-lg text-primary-100">
              {isLogin 
                ? (isRTL ? 'تسجيل الدخول إلى حسابك' : 'Sign in to your account')
                : (isRTL ? 'إنشاء حساب جديد' : 'Create a new account')
              }
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-soft p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AuthFormFields 
                email={formData.email}
                password={formData.password}
                onChange={(field, value) => setFormData({ ...formData, [field]: value })}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isLogin ? (
                      <LogIn className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    ) : (
                      <UserPlus className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    )}
                    {isLogin 
                      ? (isRTL ? 'تسجيل الدخول' : 'Sign in')
                      : (isRTL ? 'إنشاء حساب' : 'Sign up')
                    }
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
                >
                  {isLogin
                    ? (isRTL ? 'إنشاء حساب جديد' : 'Create new account')
                    : (isRTL ? 'تسجيل الدخول إلى حساب موجود' : 'Sign in to existing account')
                  }
                </button>
              </div>
            </form>
          </div>

          {/* Features Grid */}
          <AuthFeatures />

          {/* Footer */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm text-primary-100">
              {isRTL 
                ? '© ٢٠٢٤ نظام إدارة العمليات. جميع الحقوق محفوظة'
                : '© 2024 Operations Management System. All rights reserved.'
              }
            </p>
            <div className="text-sm text-primary-200 font-medium bg-white/10 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">
              {isRTL 
                ? 'تحت إدارة ورعاية المدير التنفيذي للعمليات'
                : 'Under the Management and Supervision of Operations Executive Director'
              }
              <p className="mt-1 text-white font-bold">
                {isRTL ? 'م. محمد دحيم الحربي' : 'Eng. Mohammed Duhim Alharbi'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};