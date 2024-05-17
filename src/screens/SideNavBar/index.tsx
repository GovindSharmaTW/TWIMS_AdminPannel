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
import InventoryIcon from '@mui/icons-material/Inventory';
import ContactIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import inventory from '../../assets/images/inventory.jpg'
import AssignInventoryScreen from '../AssignInventoryScreen';
import TableComponent from '../../components/TableComponent';
import ProfilePage from '../profile';
import { getDBData } from '../../firebase';
import { assignedItemDetailsRef, clientsRef, developerRef, inventoryItemsBrandNameRef, inventoryItemsRef, projectOwnerRef } from '../../firebase/firebaseConstants';
import './style.css'
import Home from '../Home';
import { useDispatch } from 'react-redux';
import { addBrandName, addClient, addDeveloper, addInventoryItem, addProjectOwner } from '../../redux/inventorySlice';
const drawerWidth = 240;

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

  const dispatch = useDispatch();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState('');
  const [inventoryTableData, setInventoryTableData] = React.useState([]);
  const [brandNameTableData, setBrandNameTableData] = React.useState([]);
  const [projectOwnerTableData, setProjectOwnerTableData] = React.useState([]);
  const [developerTableData, setDeveloperTableData] = React.useState([]);
  const [assignedInvTableData, setAssignedInvTableData] = React.useState([]);
  const [clientTableData, setClientTableData] = React.useState([]);
  const [temp, setTemp] = React.useState([])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const createTableData = (data: any, type: string) => {

    const tempData: any = [];
    const dataKeys = Object.keys(data);

    dataKeys.map((key, index) => {
      if (type === 'inventoryItem') {
        tempData.push({ name: data[key].itemName, code: `#000${index + 1}`, qty: 12, image: inventory });
      }
      else if (type === 'brandName') {
        tempData.push({ code: `#000${index + 1}`, name: data[key].brandName });
      }
      else if (type === 'projectOwner') {
        tempData.push({ id: 0, name: data[key].name, email: data[key].email, contact: data[key].phone });

      }
      else if (type === 'developer') {
        tempData.push({ id: 0, name: data[key].name, email: data[key].email, contact: data[key].phone });
      }
      else if (type === 'assignedData') {
        tempData.push({ S_No: 0, Ass_Item: data[key].item, brand_Name: data[key].itemBrandName, from_client: data[key].fromClient, pro_owner: data[key].projectOwnerName, developer: data[key].developer, assigned_date: data[key].assignedDate });
      }
      else if (type === 'client') {
        tempData.push({ id: 0, name: data[key].clientName, email: 'karigar@gmail.com', contact: 9873747433 });
      }
    })

    if (type == 'inventoryItem') {
      setInventoryTableData(tempData)
      dispatch(addInventoryItem(tempData))
    }
    else if (type === 'brandName') {
      setBrandNameTableData(tempData);
      dispatch(addBrandName(tempData))
    }
    else if (type === 'projectOwner') {
      setProjectOwnerTableData(tempData);
      dispatch(addProjectOwner(tempData))
    }
    else if (type === 'developer') {
      setDeveloperTableData(tempData);
      dispatch(addDeveloper(tempData))
    }
    else if (type === 'assignedData') {
      setAssignedInvTableData(tempData);
    }
    else if (type === 'client') {
      setClientTableData(tempData);
      dispatch(addClient(tempData))
    }
  }

  const getAllData = async () => {
    const inventoryItemData = await getDBData(inventoryItemsRef);
    const inv_Item_BrandNameData = await getDBData(inventoryItemsBrandNameRef);
    const projectOwnerData = await getDBData(projectOwnerRef);
    const developerData = await getDBData(developerRef);
    const assignedInventoryDetailsData = await getDBData(assignedItemDetailsRef);
    const clientsData = await getDBData(clientsRef);

    if (inventoryItemData) {
      createTableData(inventoryItemData, 'inventoryItem');
    }
    if (inv_Item_BrandNameData) {
      createTableData(inv_Item_BrandNameData, 'brandName');
    }
    if (projectOwnerData) {
      createTableData(projectOwnerData, 'projectOwner');
    }
    if (developerData) {
      createTableData(developerData, 'developer');
    }
    if (assignedInventoryDetailsData) {
      createTableData(assignedInventoryDetailsData, 'assignedData');
    }
    if (clientsData) {
      createTableData(clientsData, 'client');
    }
  }

  React.useEffect(() => {
    getAllData();
  }, [])

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
            {selectedTab}
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
          {['Home', 'Inventory', 'Employees', 'Assigned Inventory', 'Assign Inventory', 'Clients', 'Profile'].map((text, index) => (
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
                  {text === 'Assigned Inventory' && <RecentActorsIcon />}
                  {text === 'Home' && <HomeIcon />}
                  {text === 'Inventory' && < InventoryIcon />}
                  {text === 'Assign Inventory' && < AssignmentIcon />}
                  {text === 'Employees' && < SupervisedUserCircleIcon />}
                  {text === 'Clients' && < GroupsIcon />}

                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        {selectedTab === 'Home' && <Home />}
        {(selectedTab === 'Inventory' && inventoryTableData.length > 0 && brandNameTableData.length > 0) &&
          <>
            <TableComponent data={temp} showActionButtons={true} tableTitle={'Item List'} />

            <TableComponent data={brandNameTableData} showActionButtons={true} tableTitle={'Brand List'} />
          </>



        }


        {selectedTab === 'Profile' &&
          <ProfilePage />
        }

        {(selectedTab === 'Employees' && projectOwnerTableData.length > 0 && developerTableData.length > 0) &&
          <>
            <TableComponent data={projectOwnerTableData} showActionButtons={true} tableTitle={'Project-Owner List'} />
            <TableComponent data={developerTableData} showActionButtons={true} tableTitle={'Developer List'} />
          </>
        }

        {(selectedTab === 'Clients' && clientTableData.length > 0) &&
          <TableComponent data={clientTableData} showActionButtons={true} tableTitle={'Client List'} />
        }

        {(selectedTab === 'Assigned Inventory' && assignedInvTableData.length > 0) &&
          <TableComponent data={assignedInvTableData} showActionButtons={true} tableTitle={'Assigned Inventory List'} />
        }

        {selectedTab === 'Assign Inventory' &&
          <AssignInventoryScreen />
        }

      </Box>
    </Box>
  );
}