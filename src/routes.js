import { Suspense, lazy } from 'react';
import AuthGuard from './components/AuthGuard';
import DashboardLayout from './components/dashboard/DashboardLayout';
import GuestGuard from './components/GuestGuard';
import LoadingScreen from './components/LoadingScreen';
import MainLayout from './components/MainLayout';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// SmartMaster pages

const Overview = Loadable(lazy(() => import('./pages/dashboard/Overview')));
const Account = Loadable(lazy(() => import('./pages/dashboard/Account')));
const OrderList = Loadable(lazy(() => import('./pages/dashboard/OrderList')));
const OrderDetails = Loadable(lazy(() => import('./pages/dashboard/OrderDetails')));
const CpaList = Loadable(lazy(() => import('./pages/dashboard/CpaList')));
const CpaUserDetails = Loadable(lazy(() => import('./pages/dashboard/CpaUserDetails')));
const CustomerList = Loadable(lazy(() => import('./pages/dashboard/CustomerList')));
const ProjectBrowse = Loadable(lazy(() => import('./pages/dashboard/ProjectBrowse2')));
const ProjectDetails = Loadable(lazy(() => import('./pages/dashboard/ProjectDetails')));
const ProductList = Loadable(lazy(() => import('./pages/dashboard/ProductList')));
const ProductCreate = Loadable(lazy(() => import('./pages/dashboard/ProductCreate')));
const TemplateList = Loadable(lazy(() => import('./pages/dashboard/TemplateList')));
const TemplateCreate = Loadable(lazy(() => import('./pages/dashboard/TemplateCreate')));
const Chat = Loadable(lazy(() => import('./pages/dashboard/Chat')));
const Calendar = Loadable(lazy(() => import('./pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('./pages/dashboard/Kanban')));
const ContactTech = Loadable(lazy(() => import('./pages/ContactTech')));
const ContactQomo = Loadable(lazy(() => import('./pages/ContactQomo')));

// Authentication pages

const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
const PasswordRecovery = Loadable(lazy(() => import('./pages/authentication/PasswordRecovery')));
const PasswordReset = Loadable(lazy(() => import('./pages/authentication/PasswordReset')));
const VerifyCode = Loadable(lazy(() => import('./pages/authentication/VerifyCode')));

// Error pages

const AuthorizationRequired = Loadable(lazy(() => import('./pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('./pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./pages/ServerError')));

const routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
      },
      {
        path: 'password-recovery',
        element: <PasswordRecovery />
      },
      {
        path: 'password-reset',
        element: <PasswordReset />
      },
      {
        path: 'verify-code',
        element: <VerifyCode />
      }
    ]
  },
  {
    path: 'contact',
    element: <ContactTech />
  },
  {
    path: 'contactQomo',
    element: <ContactQomo />
  },
  {
    path: '*',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'account',
        element: <Account />
      },
      {
        path: 'calendar',
        element: <Calendar />
      },
      {
        path: 'chat',
        children: [
          {
            path: '/',
            element: <Chat />
          },
          {
            path: 'new',
            element: <Chat />
          },
          {
            path: ':threadKey',
            element: <Chat />
          }
        ]
      },
      {
        path: 'kanban',
        element: <Kanban />
      },
      {
        path: 'orders',
        children: [
          {
            path: 'browse',
            element: <OrderList />
          },
          {
            path: ':oId',
            element: <OrderDetails />
          }
        ]
      },
      {
        path: 'cpas',
        children: [
          {
            path: 'browse',
            element: <CpaList />
          },
          {
            path: ':cId',
            element: <CpaUserDetails />
          }
        ]
      },
      {
        path: 'clients',
        children: [
          {
            path: 'browse',
            element: <CustomerList />
          },
          {
            path: ':oId',
            element: <OrderDetails />
          }
        ]
      },
      {
        path: 'projects',
        children: [
          {
            path: 'browse',
            element: <ProjectBrowse />
          },
          {
            path: ':cid',
            element: <ProjectDetails />
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: 'browse',
            element: <ProductList />
          },
          {
            path: 'new',
            element: <ProductCreate />
          }
        ]
      },
      {
        path: 'templates',
        children: [
          {
            path: 'browse',
            element: <TemplateList />
          },
          {
            path: 'new',
            element: <TemplateCreate />
          }
        ]
      },
    ]
  },
  {
    path: 'error',
    element: <MainLayout />,
    children: [
      {
        path: '401',
        element: <AuthorizationRequired />
      },
      {
        path: '404',
        element: <NotFound />
      },
      {
        path: '500',
        element: <ServerError />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
