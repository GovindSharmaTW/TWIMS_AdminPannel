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
import { assignedItemDetailsRef, branchRef, clientsRef, developerRef, inventoryItemsBrandNameRef, inventoryItemsRef, projectOwnerRef, simRef } from '../../firebase/firebaseConstants';
import './style.css'
import { useDispatch } from 'react-redux';
import { addBranchName, addBrandName, addClient, addDeveloper, addInventoryItem, addProjectOwner, addSimDetails } from '../../redux/inventorySlice';
import { checkIsObjectEmpty } from '../../utils';
import ModalComponent from '../../components/ModalComponent';
import { getDatabase, ref, onValue, set, push, update } from "firebase/database";
import { toast } from 'react-toastify';
import { validateData, validateEmail, validatePhone } from '../../utils/validationConstants';
import { Loader } from '../../components/Loader';

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
  const [selectedTab, setSelectedTab] = React.useState('Inventory');
  const [inventoryTableData, setInventoryTableData] = React.useState([]);
  const [brandNameTableData, setBrandNameTableData] = React.useState([]);
  const [projectOwnerTableData, setProjectOwnerTableData] = React.useState([]);
  const [developerTableData, setDeveloperTableData] = React.useState([]);
  const [branchTableData, setBranchTableData] = React.useState([]);
  const [assignedInvTableData, setAssignedInvTableData] = React.useState([]);
  const [simTableData, setSimTableData] = React.useState([]);

  const [clientTableData, setClientTableData] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [modalChildType, setModalChildType] = React.useState('');
  const [item, setItem] = React.useState('');
  const [itemQty, setItemQty] = React.useState('0');
  const [clientName, setClientName] = React.useState('');
  const [clientEmail, setClientEmail] = React.useState('');
  const [clientPhone, setClientPhone] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [proOwnEmail, setProOwnEmail] = React.useState('');
  const [proOwnName, setProOwnName] = React.useState('');
  const [proOwnPhone, setProOwnPhone] = React.useState('');
  const [devEmail, setDevEmail] = React.useState('');
  const [devName, setDevName] = React.useState('');
  const [devPhone, setDevPhone] = React.useState('');
  const [simNumber, setSimNumber] = React.useState('');
  const [simCompName, setSimCompName] = React.useState('');
  const [branchName, setBranchName] = React.useState('');
  const [branchCity, setBranchCity] = React.useState('');
  const [branchState, setBranchState] = React.useState('');

  const [updateData, setUpdateData] = React.useState({});
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isEditable, setIsEditable] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);

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
        tempData.push({ name: data[key].itemName, qty: data[key].qty, image: inventory, id: key.toString() });
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
        tempData.push({
          S_No: index + 1, ass_item: data[key].item, item_image_urls: data[key].imageUri, brand_name: data[key].itemBrandName,
          from_client: data[key].fromClient, client_name: data[key].clientName, pro_owner: data[key].projectOwnerName,
          developer: data[key].developer, assigned_date: data[key].assignedDate,branch: data[key].branch, item_serial_num:data[key].item_serial_num, id: key.toString()
        });
      }
      else if (type === 'client') {
        tempData.push({ S_No: index + 1, name: data[key].clientName, email: data[key].email, contact: data[key].phone, id: key.toString() });
      }
      else if (type === 'sim') {
        tempData.push({ S_No: index + 1, number: data[key].simNumber, id: key.toString(), sim_company_name: data[key].simCompName });
      }
      else if (type === 'branch') {
        tempData.push({ S_No: index + 1, branch_name: data[key].branch_name, branch_state: data[key].branch_state, branch_city: data[key].branch_city, id: key.toString()});
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
    else if (type === 'sim') {
      setSimTableData(tempData);
      dispatch(addSimDetails(tempData));
    }
    else if (type === 'branch') {
      setBranchTableData(tempData);
      dispatch(addBranchName(tempData));
    }
  }

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

    const simDBRef = ref(db, simRef);
    const unsubscribeSimRef = onValue(simDBRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        createTableData(data, 'sim');
      }
    });

    const branchDBRef = ref(db, branchRef);
    const unsubscribeBranchRef = onValue(branchDBRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        createTableData(data, 'branch');
      }
    });

    return () => {
      unsubscribeInventoryRef();
      unsubscribeBrandRef();
      unsubscribeClientRef();
      unsubscribeProOwnRef();
      unsubscribeDevRef();
      unsubscribeAssignedDataRef();
      unsubscribeSimRef();
      unsubscribeBranchRef();
    }
  }, [])

  React.useEffect(() => {
    if (assignedInvTableData.length > 0) {

      const userMap = new Map();

      assignedInvTableData.forEach(item => {
        const name = item.developer.toLowerCase(); // To handle case insensitivity
        if (!userMap.has(name)) {
          userMap.set(name, {
            name: item.developer,
            totalProject: 0,
            totalAssignedItem: 0,
            assignedItems: [],
            clients: [],
          });
        }

        const user = userMap.get(name);

        if (item.from_client) {

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


          if (developerData) {

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

    }
  }, [assignedInvTableData]);


  const clearAllStates = () => {
    setIsModalVisible(false);
    setItem('');
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setBrand('');
    setProOwnEmail('');
    setProOwnName('');
    setProOwnPhone('');
    setDevEmail('');
    setDevName('');
    setDevPhone('');
    setIsDisable(false);
    setItemQty(0);
    setSimCompName('');
    setSimNumber('');
    setBranchName('');
    setBranchState('');
    setBranchCity('');
    
  }


  const addDataToDB = async (type: string, operationType: string) => {

    let data = {};
    let ref = '';

    if (type == 'item') {
      data =
      {
        itemName: item,
        qty: itemQty
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
        clientName: clientName,
        email: clientEmail,
        phone: clientPhone
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
    else if (type == 'sim') {

      if (!validatePhone(simNumber)) {
        toast.error('Phone no. should contain atleast 10 digits');
        return;
      }

      data =
      {
        simNumber: simNumber,
        simCompName: simCompName
      }
      ref = simRef
    }
    else if (type == 'branch') {
      data =
      {
        branch_name: branchName,
        branch_city:branchCity,
        branch_state : branchState
      }
      ref = branchRef
    }

    if (operationType == 'update') {
      setIsDisable(true);

      const isDataValid = validateData(data);

      if (isDataValid !== false) {
        updateFirebaseDBData(ref, updateData.id, data)
          .then(() => {
            clearAllStates();
          });
      }
      else {
        setIsDisable(false);
        toast.error('All data is required');
      }
    }
    else {

      const isDataValid = validateData(data);

      if (isDataValid !== false) {

        if (type == 'developer') {
          if (!validateEmail(devEmail)) {
            toast.error('Invalid email');
            return;
          }
          else if (!validatePhone(devPhone)) {
            toast.error('Phone no. should contain 10 digits');
            return;
          }
        }

        else if (type == 'proOwner') {
          if (!validateEmail(proOwnEmail)) {
            toast.error('Invalid email');
            return;
          }
          else if (!validatePhone(proOwnPhone)) {
            toast.error('Phone no. should contain 10 digits');
            return;
          }
        }
        else if (type == 'client') {
          if (!validateEmail(clientEmail)) {
            toast.error('Invalid email');
            return;
          }
          else if (!validatePhone(clientPhone)) {
            toast.error('Phone no. should contain 10 digits');
            return;
          }
        }

        setIsDisable(true);


        addDataToFirebaseDB(data, ref)
          .then(() => {
            clearAllStates();
          })
      }
      else {
        toast.error('All data is required');
      }
    }
  }


  const handleModalClose = (props: any) => {
    const { tableTitle, val } = props;

    setIsModalVisible(!isModalVisible);
    setModalChildType(tableTitle);

    if (val !== undefined) {
      setUpdateData(val);
      setIsUpdate(true);
      setIsEditable(false);
    }
    else {
      setUpdateData({});
      setIsUpdate(false);
    }
  }

  const getModalChildComponent = () => {

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
    else if (modalChildType == 'Sim List') {
      return (addSimModalChildComponent())
    }
    else if (modalChildType == 'Branch Name List') {
      return (addBranchModalChildComponent())
    }
  }

  const addItemModalChildComponent = () => {

    if (!checkIsObjectEmpty(updateData) && !isEditable) {
      setItem(updateData.name);
      setItemQty(updateData.qty);
    }

    return (
      <div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Item Name:
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setItem(e.target.value), setIsEditable(true) }} value={item} placeholder='Enter item name' />
        </div>

        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Qty:
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setItemQty(e.target.value), setIsEditable(true) }} value={itemQty} placeholder='Enter item name' />
        </div>

        {/* <div className='addButtonSecContainer'> */}
          <button className='addButtonSecContainer'  disabled={isDisable} onClick={() => addDataToDB('item', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
        {/* </div> */}

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
          <button disabled={isDisable} className='buttonText' onClick={() => addDataToDB('brand', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
        </div>

      </div>
    )
  }
  const addClientModalChildComponent = () => {
    if (!checkIsObjectEmpty(updateData) && !isEditable) {
      setClientName(updateData.name);
      setClientEmail(updateData.email);
      setClientPhone(updateData.contact);

    }
    return (
      <div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Client Name :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setClientName(e.target.value), setIsEditable(true) }} value={clientName} placeholder='Enter client name' />
        </div>

        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Client Email :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setClientEmail(e.target.value), setIsEditable(true) }} value={clientEmail} placeholder='Enter client name' />
        </div>

        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Client Phone No. :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setClientPhone(e.target.value), setIsEditable(true) }} value={clientPhone} placeholder='Enter client name' />
        </div>

        <div className='addButtonSecContainer'>
          <button disabled={isDisable} className='buttonText' onClick={() => addDataToDB('client', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
        </div>

      </div>
    )
  }

  const addSimModalChildComponent = () => {
    if (!checkIsObjectEmpty(updateData) && !isEditable) {
      setSimNumber(updateData.number);
      setSimCompName(updateData.sim_company_name);
    }
    return (
      <div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Sim Number :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setSimNumber(e.target.value), setIsEditable(true) }} value={simNumber} placeholder='Enter number' />
        </div>

        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Sim Company Name :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => { setSimCompName(e.target.value), setIsEditable(true) }} value={simCompName} placeholder='Enter company name' />
        </div>

        <div className='addButtonSecContainer'>
          <button disabled={isDisable} className='buttonText' onClick={() => addDataToDB('sim', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
        </div>

      </div>
    )
  }

  const addBranchModalChildComponent = () => {
    if (!checkIsObjectEmpty(updateData) && !isEditable) {
      setBranchName(updateData.branch_name);
      setBranchState(updateData.branch_state);
      setBranchCity(updateData.branch_city);
    }
    return (
      <div>
        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Branch Name :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => {setBranchName(e.target.value), setIsEditable(true) }} value={branchName} placeholder='Enter branch name' />
        </div>

        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Branch State Name :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => {setBranchState(e.target.value), setIsEditable(true) }} value={branchState} placeholder='Enter branch state' />
        </div>

        <div className='modellnputContainerStyle'>
          <label className='inputLabelStyle'>
            Branch City Name :
          </label>
          <input name="myInput" className='modelInputStyle' onChange={(e) => {setBranchCity(e.target.value), setIsEditable(true) }} value={branchCity} placeholder='Enter branch city' />
        </div>

        <div className='addButtonSecContainer'>
          <button disabled={isDisable} className='buttonText' onClick={() => addDataToDB('branch', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
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
          <button disabled={isDisable} className='buttonText' onClick={() => addDataToDB('proOwner', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
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
          <button disabled={isDisable} className='buttonText' onClick={() => addDataToDB('developer', isUpdate ? 'update' : 'add')}>{isUpdate ? 'Update Data' : 'Add Data'}</button>
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

        {isDisable &&
          <Loader />
        }

        <ModalComponent childComponent={getModalChildComponent} openModal={isModalVisible} handleModalClose={handleModalClose} />


        {selectedTab === 'Inventory' &&

          <>
            <TableComponent data={inventoryTableData} showActionButtons={true} tableTitle={'Item List'} toggleModal={handleModalClose} showAddButton={true} />

            <TableComponent data={brandNameTableData} showActionButtons={true} tableTitle={'Brand List'} toggleModal={handleModalClose} showAddButton={true} />

            <TableComponent data={simTableData} showActionButtons={true} tableTitle={'Sim List'} toggleModal={handleModalClose} showAddButton={true} />

            {/* <TableComponent data={simCompNameTableData} showActionButtons={true} tableTitle={'Sim Company Names'} toggleModal={handleModalClose} showAddButton={true} /> */}
          </>
        }


        {selectedTab === 'Profile' &&
          <ProfilePage />
        }

        {selectedTab === 'Employees' &&
          <>
            <TableComponent data={projectOwnerTableData} showActionButtons={true} tableTitle={'Project-Owner List'} toggleModal={handleModalClose} showAddButton={true} />
            <TableComponent data={developerTableData} showActionButtons={true} tableTitle={'Developer List'} toggleModal={handleModalClose} showAddButton={true} />
            <TableComponent data={branchTableData} showActionButtons={true} tableTitle={'Branch Name List'} toggleModal={handleModalClose} showAddButton={true} />
          </>
        }

        {selectedTab === 'Clients' &&
          <TableComponent data={clientTableData} showActionButtons={true} tableTitle={'Client List'} toggleModal={handleModalClose} showAddButton={true} />
        }

        {selectedTab === 'Assigned Inventory' &&
          <TableComponent data={assignedInvTableData} showActionButtons={true} tableTitle={'Assigned Inventory List'} toggleModal={handleModalClose} showAddButton={false} />
        }

        {selectedTab === 'Assign Inventory' &&
          <AssignInventoryScreen />
        }

      </Box>
    </Box>
  );
}