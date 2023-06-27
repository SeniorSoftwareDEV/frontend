// assets
import { DashboardOutlined, DeploymentUnitOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  DeploymentUnitOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const widget = {
  id: 'widget',
  title: 'Widgets',
  type: 'group',
  children: [
    {
      id: 'tradingview',
      title: 'Trading View',
      type: 'item',
      url: '/tradingview',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'keystats',
      title: 'Key Stats',
      type: 'item',
      url: '/keystats',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'signalindicator',
      title: 'Signal Indicator',
      type: 'item',
      url: '/signalindicator',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'tableindicator',
      title: 'Table Indicator',
      type: 'item',
      url: '/tableindicator',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'insideractivity',
      title: 'Insider Activity',
      type: 'item',
      url: '/insideractivity',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'splitactivity',
      title: 'Split Activity',
      type: 'item',
      url: '/splitactivity',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'levels',
      title: 'Levels',
      type: 'item',
      url: '/levels',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'technicalguage',
      title: 'Technical Guage',
      type: 'item',
      url: '/technicalguage',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'keyindicatorguage',
      title: 'Key Indicator Guage',
      type: 'item',
      url: '/keyindicatorguage',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'performancegrid',
      title: 'Performance Grid',
      type: 'item',
      url: '/performancegrid',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'economiccalendar',
      title: 'Economic Calendar',
      type: 'item',
      url: '/economiccalendar',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'infodatawindow',
      title: 'Info Data Window',
      type: 'item',
      url: '/infodatawindow',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'screener',
      title: 'Screener',
      type: 'item',
      url: '/screener',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'alerts',
      title: 'Alerts',
      type: 'item',
      url: '/alerts',
      icon: icons.DeploymentUnitOutlined
    },
    {
      id: 'mas',
      title: 'MAs',
      type: 'item',
      url: '/mas',
      icon: icons.DeploymentUnitOutlined
    }
  ]
};

export default widget;
