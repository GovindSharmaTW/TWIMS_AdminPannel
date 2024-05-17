import { useEffect, useState } from 'react';
import DropDownComponent from '../../components/DropDownComponent';
import { addDataToFirebaseDB } from '../../firebase';
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store';
import { getCurrentDate } from '../../utils';



const AssignInventoryScreen = () => {
  const [itemData, setItemData] = useState([]);
  const [itemBrandNameData, setItemBrandNameData] = useState([]);
  const [clientNameData, setClientNameData] = useState([]);
  const [projectOwnerNameData, setProjectOwnerNameData] = useState([]);
  const [developerNameData, setDeveloperNameData] = useState([]);

  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItemBrandName, setSelectedItemBrandName] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedProjectOwner, setSelectedProjectOwner] = useState('');
  const [selectedClient, setSelectedClient] = useState('');


  const addDataToDB = () => {
    const data =
    {
      item: selectedItem,
      itemBrandName: selectedItemBrandName,
      fromClient: true,
      fromThoughtWin: false,
      clientName: selectedClient,
      projectOwnerName: selectedProjectOwner,
      developer: selectedDeveloper,
      assignedDate: getCurrentDate(),
      imageUri: 'Image test uri from web',
      simCompanyName: '',
      simNumber: ''
    }
    addDataToFirebaseDB(data);
  }

  const inventoryItemData = useSelector((state: RootState) => state.inventory.inventoryItems);
  const inventoryBrandNameData = useSelector((state: RootState) => state.inventory.brandNames);
  const projectOwnersData = useSelector((state: RootState) => state.inventory.projectOwners);
  const developersData = useSelector((state: RootState) => state.inventory.developers);
  const clientsData = useSelector((state: RootState) => state.inventory.clients);


  const createDropdownData = (data: object[], type: object[]) => {
    data.map((element) => {
      type.push(element.name);
    })
  }

  useEffect(() => {
    if (inventoryItemData.length > 0) {
      createDropdownData(inventoryItemData, itemData);
    }
  }, [inventoryItemData])


  useEffect(() => {
    if (inventoryBrandNameData.length > 0) {
      createDropdownData(inventoryBrandNameData, itemBrandNameData);
    }
  }, [inventoryBrandNameData])


  useEffect(() => {
    if (projectOwnersData.length > 0) {
      createDropdownData(projectOwnersData, projectOwnerNameData);
    }
  }, [projectOwnersData])


  useEffect(() => {
    if (developersData.length > 0) {
      createDropdownData(developersData, developerNameData);
    }
  }, [developersData])


  useEffect(() => {
    if (clientsData.length > 0) {
      createDropdownData(clientsData, clientNameData);
    }
  }, [clientsData])


  return (
    <div className='baseContainer'>
      <div className='secondaryContainer'>
        <h1 className='title'>Assign Inventory</h1>
        <div className='separator' />
        <div className='inputContainer'>
          <DropDownComponent label={'Item'} optionsData={itemData} selectedValue={(value: string) => setSelectedItem(value)} />
        </div>

        <div className='inputContainer'>
          <DropDownComponent label={'Item Brand Name'} optionsData={itemBrandNameData} selectedValue={(value: string) => setSelectedItemBrandName(value)} />
        </div>

        <div className='inputContainer'>
          <DropDownComponent label={'Client Name'} optionsData={clientNameData} selectedValue={(value: string) => setSelectedClient(value)} />
        </div>

        <div className='inputContainer'>
          <DropDownComponent label={'Project Owner'} optionsData={projectOwnerNameData} selectedValue={(value: string) => setSelectedProjectOwner(value)} />
        </div>

        <div className='inputContainer'>
          <DropDownComponent label={'Developer'} optionsData={developerNameData} selectedValue={setSelectedDeveloper} />
        </div>

        <div className='loginButtonContainer' >
          <button className='loginButton' onClick={addDataToDB}>Save Data</button>
        </div>
      </div>
    </div>
  )
};

export default AssignInventoryScreen;