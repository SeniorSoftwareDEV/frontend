// assets
import { LineChartOutlined, InsertRowAboveOutlined, RocketOutlined } from '@ant-design/icons';

// icons
const icons = {
  LineChartOutlined,
  InsertRowAboveOutlined,
  RocketOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const tool = {
  id: 'tool',
  title: 'Tools',
  type: 'group',
  children: [
    {
      id: 'imagematching',
      title: 'Image Matching',
      type: 'item',
      url: '/imagematching',
      icon: icons.LineChartOutlined
    },
    {
      id: 'fxmt4dca',
      title: 'Fx MT4 DCA',
      type: 'item',
      url: '/fxmt4dca',
      icon: icons.InsertRowAboveOutlined
    },
    {
      id: 'tvindicator',
      title: 'Tv Indicator',
      type: 'item',
      url: '/tvindicator',
      icon: icons.RocketOutlined
    }
  ]
};

export default tool;
