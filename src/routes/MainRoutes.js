import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import AssignedBooking from 'views/utilities/AssignedBooking/AssignedBooking';
import VenderAllBooking from 'views/utilities/VenderSide/VendorAllBooking';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));


// utilities routing
const UserProfile = Loadable(lazy(() => import('views/ProfileSection/UserProfile')));
const AllOrders = Loadable(lazy(() => import('views/utilities/AllOrdersComponent/AllOrders')));
const NewVender = Loadable(lazy(() => import('views/utilities/AddVender/NewVender')));
const NewCar = Loadable(lazy(() => import('views/utilities/AddCar/NewCar')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
     path:'/Profile/:userid',
     element:<UserProfile/>
    },
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'notAssign/:userid',
          element: <AllOrders />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'Assigned',
          element: <AssignedBooking />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: `newVender/:userid`,
          element: <NewVender />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: `NewCar/:userid`,
          element: <NewCar />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'VendercarAssign/:venderID',
          element: <VenderAllBooking />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
