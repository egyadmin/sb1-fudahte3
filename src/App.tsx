import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { AuthProvider } from './contexts/AuthContext';
import { Sidebar } from './components/navigation/Sidebar';
import { Header } from './components/layout/Header';
import { LayoutWrapper } from './components/layout/LayoutWrapper';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Toast } from './components/common/Toast';
import { AuthGuard } from './components/common/AuthGuard';
import { GuideButton } from './components/common/guide/GuideButton';
import { useToast } from './hooks/useToast';

const App: React.FC = () => {
  const { toast } = useToast();

  return (
    <LanguageProvider>
      <AuthProvider>
        <NavigationProvider>
          <LayoutWrapper>
            <AuthGuard>
              <div className="min-h-screen bg-gray-50">
                <Sidebar />
                <Header />
                <main className="transition-all duration-200 ltr:ml-64 rtl:mr-64 pt-16 p-6">
                  <DashboardLayout />
                </main>
                <GuideButton />
                <Toast {...toast} />
              </div>
            </AuthGuard>
          </LayoutWrapper>
        </NavigationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;