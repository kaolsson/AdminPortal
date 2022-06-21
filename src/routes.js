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

// const Overview = Loadable(lazy(() => import('./pages/dashboard/Overview')));
const UpdateAccount = Loadable(lazy(() => import('./pages/dashboard/Account')));
const CpaAccount = Loadable(lazy(() => import('./pages/dashboard/OverviewCpa')));
const OrgAccount = Loadable(lazy(() => import('./pages/dashboard/OverviewOrg')));
const Organization = Loadable(lazy(() => import('./pages/dashboard/Organization')));
const OrderList = Loadable(lazy(() => import('./pages/dashboard/OrderList')));
const OrderDetails = Loadable(lazy(() => import('./pages/dashboard/OrderDetails')));
const OrderUpdate = Loadable(lazy(() => import('./pages/dashboard/OrderUpdate')));
const CpaList = Loadable(lazy(() => import('./pages/dashboard/CpaList')));
const CpaUserDetails = Loadable(lazy(() => import('./pages/dashboard/CpaUserDetails')));
const CustomerList = Loadable(lazy(() => import('./pages/dashboard/CustomerList')));
const CustomerDetails = Loadable(lazy(() => import('./pages/dashboard/CustomerDetails')));
const NewCustomer = Loadable(lazy(() => import('./pages/dashboard/NewCustomer')));
const ProjectBrowse = Loadable(lazy(() => import('./pages/dashboard/ProjectBrowse2')));
const ProjectCreate = Loadable(lazy(() => import('./pages/dashboard/ProjectCreate')));
const ProjectDetails = Loadable(lazy(() => import('./pages/dashboard/ProjectDetails')));
const ProductList = Loadable(lazy(() => import('./pages/dashboard/ProductList')));
const ProductCreate = Loadable(lazy(() => import('./pages/dashboard/ProductCreate')));
const TemplateList = Loadable(lazy(() => import('./pages/dashboard/TemplateList')));
const TemplateCreate = Loadable(lazy(() => import('./pages/dashboard/TemplateCreate')));
const TemplateDetails = Loadable(lazy(() => import('./pages/dashboard/TemplateDetails')));
const MessageList = Loadable(lazy(() => import('./pages/dashboard/MessageList')));
const SignupList = Loadable(lazy(() => import('./pages/dashboard/SignupList')));
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
const UnderConstruction = Loadable(lazy(() => import('./pages/UnderConstruction')));
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
        element: <CpaAccount />
      },
      {
          path: 'update',
          element: <UpdateAccount />
      },
      {
        path: 'account',
        element: <CpaAccount />
      },
      {
        path: 'orgaccount',
        element: <OrgAccount />
      },
      {
        path: 'organization',
        element: <Organization />
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
        path: 'order',
        children: [
            {
                path: 'new',
                element: <UnderConstruction />
            },
            {
            path: ':oId',
            element: <OrderUpdate />
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
            path: 'new',
            element: <NewCustomer />
          },
          {
            path: ':cid',
            element: <CustomerDetails />
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
            path: 'new',
            element: <ProjectCreate />
          },
          {
            path: ':cid',
            element: <ProjectDetails />
          }
        ]
      },
      {
        path: 'project',
        children: [
          {
            path: ':pid',
            element: <ProjectCreate />
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
            path: ':pid',
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
          },
          {
            path: ':tid',
            element: <TemplateDetails />
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: 'browse',
            element: <MessageList />
          },
          {
            path: 'browseSignUp',
            element: <SignupList />
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
        path: '501',
        element: <UnderConstruction />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
