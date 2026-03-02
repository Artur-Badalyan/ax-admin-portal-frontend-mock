import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';

import { AppLayout } from '@/components/AppLayout';
import { Toaster } from '@/components/Sonner';
import { ProtectedRoute } from '@/components/ProtectedRoute';

import APP_ROUTES from '@/lib/app.routes';
import { antdTheme } from '@/lib/config/theme';

import { SignInPage } from '@/pages/Auth/SignIn';
import { CallbackPage } from '@/pages/Auth/Callback';
import { OrganizationSelectionPage } from '@/pages/Auth/OrganizationSelection';

import { DashboardPage } from '@/pages/Dashboard';
import { OrganizationDetails } from '@/pages/Organizations/Details';
import { RequestsPage } from '@/pages/Request';
import { RequestDetails } from '@/pages/Request/Details';
import { MembersPage } from '@/pages/Members';
import { BillingPage } from '@/pages/BillingPage';
import { Organizations } from '@/pages/Organizations';
import { MemberDetails } from '@/pages/Members/Details';
import { LicenseDetails } from '@/pages/Licenses/Details';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={antdTheme}>
        <Toaster position="top-center" offset={50} richColors />
        <Suspense fallback={<Spin fullscreen />}>
          <Routes>
            <Route path={APP_ROUTES.signIn.path} element={<SignInPage />} />
            <Route
              path={APP_ROUTES.microsoftCallback.path}
              element={<CallbackPage />}
            />
            <Route
              path={APP_ROUTES.organizationSelection.path}
              element={<OrganizationSelectionPage />}
            />

            <Route element={<AppLayout />}>
              <Route
                path={APP_ROUTES.dashboard.path}
                element={<DashboardPage />}
              />

              <Route
                path={APP_ROUTES.requests.path}
                element={
                  <ProtectedRoute allowedRoles={APP_ROUTES.requests.access}>
                    <RequestsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path={APP_ROUTES.requestDetails.path}
                element={
                  <ProtectedRoute
                    allowedRoles={APP_ROUTES.requestDetails.access}
                  >
                    <RequestDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path={APP_ROUTES.members.path}
                element={
                  <ProtectedRoute allowedRoles={APP_ROUTES.members.access}>
                    <MembersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path={APP_ROUTES.memberLicenses.path}
                element={
                  <ProtectedRoute
                    allowedRoles={APP_ROUTES.memberLicenses.access}
                  >
                    <MemberDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path={APP_ROUTES.licenseDetails.path}
                element={
                  <ProtectedRoute
                    allowedRoles={APP_ROUTES.licenseDetails.access}
                  >
                    <LicenseDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path={APP_ROUTES.billing.path}
                element={
                  <ProtectedRoute allowedRoles={APP_ROUTES.billing.access}>
                    <BillingPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path={APP_ROUTES.organizations.path}
                element={
                  <ProtectedRoute
                    allowedRoles={APP_ROUTES.organizations.access}
                  >
                    <Organizations />
                  </ProtectedRoute>
                }
              />
              <Route
                path={APP_ROUTES.organizationDetails.path}
                element={<OrganizationDetails />}
              />
            </Route>
          </Routes>
        </Suspense>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
