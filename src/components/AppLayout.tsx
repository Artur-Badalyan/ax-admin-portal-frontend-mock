import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import routes from '@/lib/app.routes';
import Header from '@/components/Header';
import { useAuthStore } from '@/store/auth.store';
import { PageSpinner } from '@/components/Loader';

export function AppLayout() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      {isAuthenticated ? (
        <Layout className="app-layout">
          <Header />
          <Layout.Content className="layout-content">
            <Outlet />
          </Layout.Content>
        </Layout>
      ) : (
        <Navigate to={routes.signIn.path} replace />
      )}
    </>
  );
}
