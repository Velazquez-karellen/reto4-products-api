import React from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';

function AppContent() {
  const { token } = useAuth();

  if (!token) {
    return <LoginPage />;
  }

  return <ProductsPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
