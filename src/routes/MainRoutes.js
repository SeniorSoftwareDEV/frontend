import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router';
// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const MT4Tools = Loadable(lazy(() => import('pages/mt4tools')));
const InsiderActivity = Loadable(lazy(() => import('pages/component-widget/InsiderActivity')));
const SpliteHistory = Loadable(lazy(() => import('pages/component-widget/SplitHistory')));
// const SelectComponent = Loadable(lazy(() => import('pages/mt4tools/Select')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Navigate replace to="login" />
    },
    {
      path: '/dashboard',
      element: <></>
    },
    {
      path: '/imagematching',
      element: <DashboardDefault />
    },
    {
      path: '/fxmt4dca',
      element: <MT4Tools />
    },
    {
      path: '/tvindicator',
      element: <></>
    },
    {
      path: '/tradingview',
      element: <></>
    },
    {
      path: '/keystats',
      element: <></>
    },
    {
      path: '/signalindicator',
      element: <></>
    },
    {
      path: '/tableindicator',
      element: <></>
    },
    {
      path: '/insideractivity',
      element: <InsiderActivity />
    },
    {
      path: '/splitactivity',
      element: <SpliteHistory />
    },
    {
      path: '/levels',
      element: <></>
    },
    {
      path: '/technicalguage',
      element: <></>
    },
    {
      path: '/keyindicatorguage',
      element: <></>
    },
    {
      path: '/performancegrid',
      element: <></>
    },
    {
      path: '/economiccalendar',
      element: <></>
    },
    {
      path: '/infodatawindow',
      element: <></>
    },
    {
      path: '/screener',
      element: <></>
    },
    {
      path: '/alerts',
      element: <></>
    },
    {
      path: '/mas',
      element: <></>
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
