import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ListIcon from '@mui/icons-material/List';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LoginPage from '../login';
import BrandNameListComponent from '../../components/BrandNameListComponent';
import ClientListComponent from '../../components/ClientListComponent';
import DeveloperListComponent from '../../components/DeveloperListComponent';
import ProjectOwnerListComponent from '../../components/ProjectOwnerListComponent';
import TableComponent from '../../components/TableComponent';
import inventory from '../../assets/images/inventory.jpg'


// const [selectedTab, setSelectedTab] = React.useState('');

// console.log("TT01 selectedTab is",selectedTab);

const drawerWidth = 240;

const itemTableData = [{ id: 0, item: 'Laptop' }, { id: 1, item: 'Mouse' }, { id: 2, item: 'Keyboard' }, { id: 3, item: 'Connector' }];
const itemTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Item Name' }];

const brandTableData = [{code: '#0001', name: 'HP' }, {code: '#0002', name: 'Avita' }, {code: '#0003', name: 'Dell' }, {code: '#0004', name: 'Appple' }, {code: '#0005', name: 'Lenovo' }]
const brandTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Brand Name' }];

const clientTableData = [{ id: 0, name: 'Karigar', email:'karigar@gmail.com', contact:9873747433 }, { id: 1, name: 'JMB', email:'jmb@gmail.com', contact:8873747432 }, { id: 2, name: 'AutoZone', email:'autozone@gmail.com', contact:7873747431 }, { id: 3, name: 'LatitudePay', email:'latitude_pay@gmail.com', contact:9873747430 }]
const clientTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Client Name' }];

const developerTableData = [{ id: 0, name: 'Govind Sharma', email : 'govind@thoughtwin.com', contact:9876533566 }, { id: 1, name: 'Aayush Chourasiya', email : 'aayush@thoughtwin.com', contact:8876533567}, { id: 2, name: 'Kunal Rai', email : 'kunal@thoughtwin.com', contact:6876533565 }, { id: 3, name: 'Aryan Behor', email : 'aryan@thoughtwin.com', contact:8876533569 }]
const developerTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Name' }, { id: 2, heading: 'Email' }];

const projectOwnerTableData = [{ id: 0, name: 'Mukul Pande', email:'mukul@thoughtwin.com', contact:9876533568 }, { id: 1, name: 'Arpita', email: 'arpita@thoughtwin.com', contact:8876533586 }, { id: 2, name: 'Aksh Sharma', email:'aksh@thoughtwin.com', contact:9876533569 }]
const projectOwnerTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Name' }, { id: 2, heading: 'Email' }];

const inventoryTableData = [
  { name: 'Macbook Pro', code: '#0001', qty: 12, image:inventory},
  { name: 'Connector ', code: '#0002', qty: 25 , image:inventory},
  { name: 'Mouse', code: '#0003', qty: 32 , image:inventory},
  { name: 'Keyboard', code: '#0004', qty: 50 , image:inventory},
  { name: 'Charger', code: '#0005', qty: 12, image:inventory }
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideNavBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('');


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  console.log("TT01 selectedTab", selectedTab);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Home', 'Items', 'Assigned Details', 'Assign', 'Profile'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}

                onClick={() => setSelectedTab(text)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}

                >
                  {text === 'Profile' && <ContactIcon />}

                  {text === 'Assigned Details' && <ListIcon />}
                  {text === 'Home' && <HomeIcon />}
                  {text === 'Items' && < InventoryIcon />}
                  {text === 'Assign' && < AssignmentIcon />}

                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {selectedTab === 'Home' && 'Items'}
        {selectedTab === 'Assigned Details' && 'Assigned Details'}
        {selectedTab === 'Assign' && ''}
        {selectedTab === 'Profile' && 'Profile'}
        
        <div className='Heading' >
          <TableComponent data={inventoryTableData} showActionButtons={true} tableTitle={'Item List'}/>
          <TableComponent data={brandTableData} showActionButtons={true} tableTitle={'Brand List'}/>
          <TableComponent data={clientTableData} showActionButtons={true} tableTitle={'Client List'}/>
          <TableComponent data={projectOwnerTableData} showActionButtons={true} tableTitle={'Project-Owner List'}/>
          <TableComponent data={developerTableData} showActionButtons={true} tableTitle={'Developer List'}/>
        </div>

        {/* <LoginPage/> */}
       
      </Box>
    </Box>
  );
}