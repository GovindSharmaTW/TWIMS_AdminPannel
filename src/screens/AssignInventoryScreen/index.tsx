import { useEffect, useState } from 'react';
import DropDownComponent from '../../components/DropDownComponent';
import { addDataToFirebaseDB } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store';
import { getCurrentDate } from '../../utils';
import { assignedItemDetailsRef } from '../../firebase/firebaseConstants';
import styles from './styles.module.css';

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
    addDataToFirebaseDB(data, assignedItemDetailsRef);
  }

  const inventoryItemData = useSelector((state: RootState) => state.inventory.inventoryItems);
  const inventoryBrandNameData = useSelector((state: RootState) => state.inventory.brandNames);
  const projectOwnersData = useSelector((state: RootState) => state.inventory.projectOwners);
  const developersData = useSelector((state: RootState) => state.inventory.developers);
  const clientsData = useSelector((state: RootState) => state.inventory.clients);


  const createDropdownData = (data: object[], type: object[]) => {
    const temp = [];
    data.map((element) => {
      temp.push(element.name);
    })

    if (type == 'item') {
      setItemData(temp);
    }
    else if (type == 'brand') {
      setItemBrandNameData(temp);
    }
    else if (type == 'projectOwner') {
      setProjectOwnerNameData(temp);
    }
    else if (type == 'developer') {
      setDeveloperNameData(temp);
    }
    else if (type == 'client') {
      setClientNameData(temp);
    }

    // type = [...new Set(type)]


  }

  useEffect(() => {
    if (inventoryItemData.length > 0) {
      createDropdownData(inventoryItemData, "item");
    }
  }, [inventoryItemData])


  useEffect(() => {
    if (inventoryBrandNameData.length > 0) {
      createDropdownData(inventoryBrandNameData, "brand");
    }
  }, [inventoryBrandNameData])


  useEffect(() => {
    if (projectOwnersData.length > 0) {
      createDropdownData(projectOwnersData, "projectOwner");
    }
  }, [projectOwnersData])


  useEffect(() => {
    if (developersData.length > 0) {
      createDropdownData(developersData, "developer");
    }
  }, [developersData])


  useEffect(() => {
    if (clientsData.length > 0) {
      createDropdownData(clientsData, "client");
    }
  }, [clientsData])


  return (
    <div className={styles.baseContainer}>
      <div className={styles.secondaryContainer}>
        <h1 className={styles.title}>Assign Inventory</h1>
        <div className={styles.separator} />
        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Item'} optionsData={itemData} selectedValue={(value: string) => setSelectedItem(value)} />
        </div>

        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Item Brand Name'} optionsData={itemBrandNameData} selectedValue={(value: string) => setSelectedItemBrandName(value)} />
        </div>

        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Client Name'} optionsData={clientNameData} selectedValue={(value: string) => setSelectedClient(value)} />
        </div>

        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Project Owner'} optionsData={projectOwnerNameData} selectedValue={(value: string) => setSelectedProjectOwner(value)} />
        </div>

        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Developer'} optionsData={developerNameData} selectedValue={setSelectedDeveloper} />
        </div>

        <div className={styles.saveButtonContainer} >
          <button className={styles.saveButton} onClick={addDataToDB}>Save Data</button>
        </div>
      </div>
    </div>
  )
};

export default AssignInventoryScreen;