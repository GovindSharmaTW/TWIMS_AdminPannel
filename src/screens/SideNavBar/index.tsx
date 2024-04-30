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

// const [selectedTab, setSelectedTab] = React.useState('');

// console.log("TT01 selectedTab is",selectedTab);

const drawerWidth = 240;

const itemTableData = [{ id: 0, item: 'Laptop' }, { id: 1, item: 'Mouse' }, { id: 2, item: 'Keyboard' }, { id: 3, item: 'Connector' }];
const itemTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Item Name' }];

const brandTableData = [{ id: 0, name: 'HP' }, { id: 1, name: 'Avita' }, { id: 2, name: 'Dell' }, { id: 3, name: 'Appple' }, { id: 4, name: 'Lenovo' }]
const brandTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Brand Name' }];

const clientTableData = [{ id: 0, name: 'Karigar' }, { id: 1, name: 'JMB' }, { id: 2, name: 'AutoZone' }, { id: 3, name: 'LatitudePay' }]
const clientTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Client Name' }];

const developerTableData = [{ id: 0, name: 'Govind Sharma', email : 'govind@thoughtwin.com' }, { id: 1, name: 'Aayush Chourasiya', email : 'aayush@thoughtwin.com'}, { id: 2, name: 'Kunal Rai', email : 'kunal@thoughtwin.com' }, { id: 3, name: 'Aryan Behor', email : 'aryan@thoughtwin.com' }]
const developerTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Name' }, { id: 2, heading: 'Email' }];

const projectOwnerTableData = [{ id: 0, name: 'Mukul Pande', email:'mukul@thoughtwin.com' }, { id: 1, name: 'Arpita', email: 'arpita@thoughtwin.com' }, { id: 2, name: 'Aksh Sharma', email:'aksh@thoughtwin.com' }]
const projectOwnerTableHeadingData = [{ id: 0, heading: 'S.No.' }, { id: 1, heading: 'Name' }, { id: 2, heading: 'Email' }];


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
        {/* {selectedTab === 'Items' && <ItemTable/>} */}
        {selectedTab === 'Assigned Details' && 'Assigned Details'}
        {selectedTab === 'Assign' && ''}
        {selectedTab === 'Profile' && 'Profile'}
        
        <div className='Heading' >
          <TableComponent data={itemTableData} tableHeadingData = {itemTableHeadingData} showButtons ={true}/>
          <TableComponent data={brandTableData} tableHeadingData = {brandTableHeadingData} showButtons ={true}/>
          <TableComponent data={clientTableData} tableHeadingData = {clientTableHeadingData} showButtons ={true}/>
          <TableComponent data={developerTableData} tableHeadingData = {developerTableHeadingData} showButtons ={true}/>
          <TableComponent data={projectOwnerTableData} tableHeadingData = {projectOwnerTableHeadingData} showButtons ={true}/>
        </div>

        {/* <LoginPage/> */}
       
      </Box>
    </Box>
  );
}