import * as React from 'react';
import './App.css';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { QueryClient, QueryClientProvider } from 'react-query';
import DoggyList from './DoggyList';
import Favorites from './Favorites';
import { Favorite } from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const queryClient = new QueryClient();
function App() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor='inherit'
          indicatorColor='primary'
          aria-label='secondary tabs example'
          centered
        >
          <Tab
            sx={{ color: 'black' }}
            icon={<ListIcon sx={{ color: 'black' }} />}
            label='Doggies'
            {...a11yProps(0)}
          />
          <Tab
            sx={{ color: 'black' }}
            icon={<Favorite sx={{ color: 'red' }} />}
            label='FAVORITES'
            {...a11yProps(1)}
          />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          className='!p-0'
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <DoggyList />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Favorites />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
