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
import GroupsIcon from '@mui/icons-material/Groups';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import inventory from '../../assets/images/inventory.jpg'
import AssignInventoryScreen from '../AssignInventoryScreen';
import TableComponent from '../../components/TableComponent';
import ProfilePage from '../profile';
import { addDataToFirebaseDB, updateFirebaseDBData } from '../../firebase';
import { assignedItemDetailsRef, clientsRef, developerRef, inventoryItemsBrandNameRef, inventoryItemsRef, projectOwnerRef } from '../../firebase/firebaseConstants';
import './style.css'
import { useDispatch } from 'react-redux';
import { addBrandName, addClient, addDeveloper, addInventoryItem, addProjectOwner } from '../../redux/inventorySlice';
import { checkIsObjectEmpty } from '../../utils';
import ModalComponent from '../../components/ModalComponent';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { toast } from 'react-toastify';

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
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalChildType, setModalChildType] = React.useState('');
  const [item, setItem] = React.useState('');
  const [client, setClient] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [proOwnEmail, setProOwnEmail] = React.useState('');
  const [proOwnName, setProOwnName] = React.useState('');
  const [proOwnPhone, setProOwnPhone] = React.useState('');
  const [devEmail, setDevEmail] = React.useState('');
  const [devName, setDevName] = React.useState('');
  const [devPhone, setDevPhone] = React.useState('');
  const [updateData, setUpdateData] = React.useState({});
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const createTableData = (data: any, type: string) => {

    console.log("TT01 createTableData is", data, type);

    const tempData: any = [];
    const dataKeys = Object.keys(data);

    dataKeys.map((key, index) => {
      if (type === 'inventoryItem') {
        tempData.push({ name: data[key].itemName, code: `#000${index + 1}`, qty: 12, image: inventory, id: key.toString() });
      }
      else if (type === 'brandName') {
        tempData.push({ code: `#000${index + 1}`, name: data[key].brandName, id: key.toString() });
      }
      else if (type === 'projectOwner') {
        tempData.push({ S_No: index + 1, name: data[key].name, email: data[key].email, contact: data[key].phone, id: key.toString() });

      }
      else if (type === 'developer') {
        tempData.push({ S_No: index + 1, name: data[key].name, email: data[key].email, contact: data[key].phone, id: key.toString() });
      }
      else if (type === 'assignedData') {
        tempData.push({ S_No: index + 1, ass_item: data[key].item, item_image_urls: data[key].imageUri, brand_name: data[key].itemBrandName, from_client: data[key].fromClient, client_name: data[key].clientName, pro_owner: data[key].projectOwnerName, developer: data[key].developer, assigned_date: data[key].assignedDate, id: key.toString() });
      }
      else if (type === 'client') {
        tempData.push({ S_No: index + 1, name: data[key].clientName, email: 'karigar@gmail.com', contact: 9873747433, id: key.toString() });
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

  console.log('inventoryTableData keys is', inventoryTableData);


  React.useEffect(() => {

    const db = getDatabase();

    const inventoryDBRef = ref(db, inventoryItemsRef);
    const unsubscribeInventoryRef = onValue(inventoryDBRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        createTableData(data, 'inventoryItem');
      }
    });

    const brandDBRef = ref(db, inventoryItemsBrandNameRef);
    const unsubscribeBrandRef = onValue(brandDBRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        createTableData(data, 'brandName');
      }
    });

    const clientDBRef = ref(db, clientsRef);
    const unsubscribeClientRef = onValue(clientDBRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        createTableData(data, 'client');
      }
    });

    const proOwnDBRef = ref(db, projectOwnerRef);
    const unsubscribeProOwnRef = onValue(proOwnDBRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        createTableData(data, 'projectOwner');
      }
    });

    const devDBRef = ref(db, developerRef);
    const unsubscribeDevRef = onValue(devDBRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        createTableData(data, 'developer');
      }
    });

    const assignedDataDBRef = ref(db, assignedItemDetailsRef);
    const unsubscribeAssignedDataRef = onValue(assignedDataDBRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        createTableData(data, 'assignedData');
      }
    });

    return () => {
      console.log("TT-01");
      unsubscribeInventoryRef();
      unsubscribeBrandRef();
      unsubscribeClientRef();
      unsubscribeProOwnRef();
      unsubscribeDevRef();
      unsubscribeAssignedDataRef();
    }
  }, [])

  React.useEffect(() => {
    if (assignedInvTableData.length > 0) {

      console.log("TT01 assignedInvTableData", assignedInvTableData);

      const userMap = new Map();

      assignedInvTableData.forEach(item => {
        const name = item.developer.toLowerCase(); // To handle case insensitivity
        if (!userMap.has(name)) {
          userMap.set(name, {
            name: item.developer,
            totalProject: 0,
            totalAssignedItem: 0,
            assignedItems: [],
            clients: []
          });
        }

        const user = userMap.get(name);

        //  const checkClient = user.clients.some(client =>client === item.client_name);
        // if (item.fromClient && !checkClient) {
        if (item.from_client) {

          //  user.clients.push(item.client_name); 

          user.totalProject += 1;
        }

        const checkItem = user.assignedItems.some(assItem => assItem === item.ass_item);
        if (!checkItem) {
          user.assignedItems.push({ item: item.ass_item, ass_date: item.assigned_date, item_image_urls: item.item_image_urls, client: item.client_name, brand: item.brand_name, project_owner: item.pro_owner });

          user.totalAssignedItem += 1;
        }

      });

      const finalData = Array.from(userMap.values());

      if (developerTableData.length > 0) {
        const updatedDeveloperTableData = developerTableData.map(item => {
          // Create a shallow copy to ensure it's extensible
          const extensibleItem = { ...item };

          const developerData = finalData.find(tempItem => tempItem.name === extensibleItem.name);

          console.log("TT01 outside developerTableData", developerTableData);
          console.log("TT01 outside developerData", developerData);

          if (developerData) {
            console.log("TT01 inside developerData", developerData);

            if (developerData.totalAssignedItem) {
              extensibleItem.total_ass_item = developerData.totalAssignedItem;
            }

            if (developerData.totalProject) {
              extensibleItem.total_ass_project = developerData.totalProject;
            }

            extensibleItem.ass_items = developerData.assignedItems
          }
          else {
            extensibleItem.total_ass_Item = 0;

            extensibleItem.total_ass_project = 0;
          }

          return extensibleItem;
        });

        setDeveloperTableData(updatedDeveloperTableData); // Update the state with the new array
      }

      console.log("finaldata is", finalData);
    }
  }, [assignedInvTableData]);

  const clearAllStates = () => {
    setIsModalVisible(false);
    setItem('');
    setClient('');
    setBrand('');
    setProOwnEmail('');
    setProOwnName('');
    setProOwnPhone('');
    setDevEmail('');
    setDevName('');
    setDevPhone('');
  }

  const addDataToDB = (type: string, operationType: string) => {

    console.log("TT01 addDataToDB type operationType", type, operationType);

    let data = {};
    let ref = '';

    if (type == 'item') {
      data =
      {
        itemName: item
      }
      ref = inventoryItemsRef
    }
    else if (type == 'brand') {
      data =
      {
        brandName: brand
      }
      ref = inventoryItemsBrandNameRef
    }
    else if (type == 'client') {
      data =
      {
        clientName: client
      }
      ref = clientsRef
    }
    else if (type == 'proOwner') {
      data =
      {
        email: proOwnEmail,
        name: proOwnName,
        phone: proOwnPhone
      }
      ref = projectOwnerRef
    }
    else if (type == 'developer') {
      data =
      {
        email: devEmail,
        name: devName,
        phone: devPhone
      }
      ref = developerRef
    }


    if (!checkIsObjectEmpty(data)) {

      if (operationType == 'update') {
        updateFirebaseDBData(ref, updateData.id, data)
          .then(() => {
            clearAllStates();
          });
      }
      else {
        addDataToFirebaseDB(data, ref)
          .then(() => {
            clearAllStates();
          })
      }

    }
    else {
      toast.error('Please Enter Valid Data')
    }
  }


  const handleModalClose = (props: any) => {

    console.log("TT01 handleModalClose function props are", props);

    const { tableTitle, val } = props;

    console.log("TT01 handleModalClose function props val is", val);


    setIsModalVisible(!isModalVisible);
    setModalChildType(tableTitle);

    if (val !== undefined) {
      console.log('if>>>>361')
      setUpdateData(val);
      setIsUpdate(true);
      setIsEditable(false);
    }
    else {
      console.log('else>>>>361')
      setUpdateData({});
      setIsUpdate(false);
    }
  }

  const getModalChildComponent = () => {

    console.log("TT01 getModalChildComponent calling", modalChildType);

    if (modalChildType == 'Item List') {
      return (addItemModalChildComponent())
    }
    else if (modalChildType == 'Brand List') {
      return (addBrandModalChildComponent())
    }
    else if (modalChildType == 'Project-Owner List') {
      return (addProOwnModalChildComponent())
    }
    else if (modalChildType == 'Developer List') {
      return (addDevModalChildComponent())
    }
    else if (modalChildType == 'Client List') {
      return (addClientModalChildComponent())
    }
  }

  const addItemModalChildComponent = () => {

    if (!checkIsObjectEmpty(updateData) && !isEditable) {
      setItem(updateData.name);
    }

    return (
      <div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Item Name:
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setItem(e.target.value), setIsEditable(true) }} value={item} placeholder='Enter item name' />
        </div>

        <div className='addButtonSecContainer'>
          <button className='buttonText' onClick={() => addDataToDB('item', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
        </div>

      </div>
    )
  }

  const addBrandModalChildComponent = () => {
    if (!checkIsObjectEmpty(updateData) && !isEditable) {
      setBrand(updateData.name);
    }
    return (
      <div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Brand Name:
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setBrand(e.target.value), setIsEditable(true) }} value={brand} placeholder='Enter brand name' />
        </div>

        <div className='addButtonSecContainer'>
          <button className='buttonText' onClick={() => addDataToDB('brand', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
        </div>

      </div>
    )
  }
  const addClientModalChildComponent = () => {
    if (!checkIsObjectEmpty(updateData) && !isEditable) {
      setClient(updateData.name);
    }
    return (
      <div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Client Name :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setClient(e.target.value), setIsEditable(true) }} value={client} placeholder='Enter client name' />

        </div>

        <div className='addButtonSecContainer'>
          <button className='buttonText' onClick={() => addDataToDB('client', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
        </div>

      </div>
    )
  }

  const addProOwnModalChildComponent = () => {
    if (!checkIsObjectEmpty(updateData) && !isEditable) {
      setProOwnEmail(updateData.email);
      setProOwnName(updateData.name);
      setProOwnPhone(updateData.contact);
    }
    return (
      <div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Project Owner Email :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setProOwnEmail(e.target.value), setIsEditable(true) }} value={proOwnEmail} placeholder='Enter email' />
        </div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Project Owner Name:
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setProOwnName(e.target.value), setIsEditable(true) }} value={proOwnName} placeholder='Enter name' />
        </div> <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Project Owner Phone No. :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setProOwnPhone(e.target.value), setIsEditable(true) }} value={proOwnPhone} placeholder='Enter phone no.' />
        </div>

        <div className='addButtonSecContainer'>
          <button className='buttonText' onClick={() => addDataToDB('proOwner', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
        </div>

      </div>
    )
  }

  const addDevModalChildComponent = () => {

    if (!checkIsObjectEmpty(updateData) && !isEditable) {
      setDevEmail(updateData.email);
      setDevName(updateData.name);
      setDevPhone(updateData.contact);
    }

    return (
      <div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Developer Email :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setDevEmail(e.target.value), setIsEditable(true) }} value={devEmail} placeholder='Enter email' />
        </div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Developer Name:
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setDevName(e.target.value), setIsEditable(true) }} value={devName} placeholder='Enter name' />
        </div> <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Developer Phone No. :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setDevPhone(e.target.value), setIsEditable(true) }} value={devPhone} placeholder='Enter phone no.' />
        </div>

        <div className='addButtonSecContainer'>
          <button className='buttonText' onClick={() => addDataToDB('developer', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
        </div>

      </div>
    )
  }

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
          {['Inventory', 'Employees', 'Assigned Inventory', 'Assign Inventory', 'Clients', 'Profile'].map((text, index) => (
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

        <ModalComponent childComponent={getModalChildComponent} openModal={isModalVisible} handleModalClose={handleModalClose} />


        {(selectedTab === 'Inventory' && inventoryTableData.length > 0 && brandNameTableData.length > 0) &&
          <>
            <TableComponent data={inventoryTableData} showActionButtons={true} tableTitle={'Item List'} toggleModal={handleModalClose} showAddButton={true} />

            <TableComponent data={brandNameTableData} showActionButtons={true} tableTitle={'Brand List'} toggleModal={handleModalClose} showAddButton={true} />
          </>

        }


        {selectedTab === 'Profile' &&
          <ProfilePage />
        }

        {(selectedTab === 'Employees' && projectOwnerTableData.length > 0 && developerTableData.length > 0) &&
          <>
            <TableComponent data={projectOwnerTableData} showActionButtons={true} tableTitle={'Project-Owner List'} toggleModal={handleModalClose} showAddButton={true} />
            <TableComponent data={developerTableData} showActionButtons={true} tableTitle={'Developer List'} toggleModal={handleModalClose} showAddButton={true} />
          </>
        }

        {(selectedTab === 'Clients' && clientTableData.length > 0) &&
          <TableComponent data={clientTableData} showActionButtons={true} tableTitle={'Client List'} toggleModal={handleModalClose} showAddButton={true} />
        }

        {(selectedTab === 'Assigned Inventory' && assignedInvTableData.length > 0) &&
          <TableComponent data={assignedInvTableData} showActionButtons={true} tableTitle={'Assigned Inventory List'} toggleModal={handleModalClose} showAddButton={false} />
        }

        {selectedTab === 'Assign Inventory' &&
          <AssignInventoryScreen />
        }

      </Box>
    </Box>
  );
}