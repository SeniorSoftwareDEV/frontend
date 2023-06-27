import * as React from 'react';
import { Tab, Tabs } from '@mui/material';
import Open_Tab from './Open_tab';
import Closed_Tab from './Close_tab';

function TabPanel({ value, index, children }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function FxTab() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div style={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="secondary tabs example" TabIndicatorProps={{ style: { display: 'none' } }}>
        <Tab
          value="one"
          label="Open Positions"
          sx={{
            '&.Mui-selected': {
              color: 'RGB(5, 132, 120)',
              borderBottom: '2px solid RGB(5, 132, 120)'
            },
            color: 'RGBa(255, 255, 255, 0.5)'
          }}
        />
        <Tab
          value="two"
          label="Closed Positions"
          sx={{
            '&.Mui-selected': {
              color: 'RGB(5, 132, 120)',
              borderBottom: '2px solid RGB(5, 132, 120)'
            },
            color: 'RGBa(255, 255, 255, 0.5)'
          }}
        />
      </Tabs>
      <TabPanel value={value} index="one" >
          <Open_Tab />
      </TabPanel>
      <TabPanel value={value} index="two">
          <Closed_Tab />
      </TabPanel>
    </div>
  );
}
