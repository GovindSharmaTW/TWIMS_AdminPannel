import { useEffect, useState } from 'react';
import DropDownComponent from '../../components/DropDownComponent';
import { addDataToFirebaseDB, handleUpload } from '../../firebase';
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { checkIsEmpty, getCurrentDate } from '../../utils';
import { assignedItemDetailsRef } from '../../firebase/firebaseConstants';
import styles from './styles.module.css';
import 'react-image-picker-editor/dist/index.css'
import MultipleImagePicker from '../../components/MultipleImagePicker';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader';
import FloatingLabelInput from '../../components/FloatingLabelInput';
const AssignInventoryScreen = () => {
  const [itemData, setItemData] = useState([]);
  const [itemBrandNameData, setItemBrandNameData] = useState([]);
  const [clientNameData, setClientNameData] = useState([]);
  const [simDropdownData, setSimDropdownData] = useState([]);
  const [projectOwnerNameData, setProjectOwnerNameData] = useState([]);
  const [developerNameData, setDeveloperNameData] = useState([]);
  const [branchNameData, setBranchNameData] = useState([]);

  const [selectedItem, setSelectedItem] = useState('');
  const [selectedItemBrandName, setSelectedItemBrandName] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedProjectOwner, setSelectedProjectOwner] = useState('');
  const [selectedSimNumber, setSelectedSimNumber] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const [resetDropdown, setResetDropdown] = useState(false);
  const [itemSerialNum, setItemSerialNum] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');


  const addDataToDB = async () => {
    setIsDisable(true);
    const data =
    {
      item: selectedItem,
      itemBrandName: selectedItemBrandName,
      fromClient: !checkIsEmpty(selectedClient),
      fromThoughtWin: checkIsEmpty(selectedClient),
      clientName: selectedClient,
      projectOwnerName: selectedProjectOwner,
      developer: selectedDeveloper,
      branch:selectedBranch,
      item_serial_num:itemSerialNum,
      assignedDate: getCurrentDate(),
      imageUri: [],
    };

    let tempData = { ...data };

    if (selectedImages.length > 0) {
      try {
        const res = await handleUpload(selectedImages);

        if (res.length > 0) {
          tempData.imageUri = res;
        }

        if (selectedItem === 'SIM') {
          tempData = { ...tempData, simNumber: selectedSimNumber };
        }
      } catch (error) {
        toast.error("Error uploading images:");
      }
    } else {
      if (selectedItem === 'SIM') {
        tempData = { ...tempData, simNumber: selectedSimNumber };
      }
    }

    addAssignedData(tempData);
  };


  const addAssignedData = (data: {}) => {

    let isValid = false;

    if (selectedItem == 'SIM') {

      if (selectedDeveloper !== '' && selectedSimNumber !== '') {
        isValid = true;
      }
    }
    else if (selectedClient !== '') {
      if (selectedItem !== '' && selectedDeveloper !== '' && selectedItemBrandName !== '' && selectedProjectOwner !== '') {
        isValid = true;
      }
    }
    else {

      if (selectedDeveloper !== '' && selectedItemBrandName !== '' && selectedItem !== '') {
        isValid = true;
      }
    }

    if (isValid) {
      addDataToFirebaseDB(data, assignedItemDetailsRef).then((res) => {
        clearAllData();
      });
    }
    else {
      toast.error('All data is required');
      setIsDisable(false);
    }
  }

  const inventoryItemData = useSelector((state: RootState) => state.inventory.inventoryItems);
  const inventoryBrandNameData = useSelector((state: RootState) => state.inventory.brandNames);
  const projectOwnersData = useSelector((state: RootState) => state.inventory.projectOwners);
  const developersData = useSelector((state: RootState) => state.inventory.developers);
  const clientsData = useSelector((state: RootState) => state.inventory.clients);
  const simData = useSelector((state: RootState) => state.inventory.simDetails);
  const branchData = useSelector((state: RootState) => state.inventory.branchNames);


  const createDropdownData = (data: object[], type: object[]) => {
    const temp = [];

    if (type == 'sim') {
      data.map((element) => {
        temp.push(element.number);
      })
    }
    else if (type == 'branch') {
      data.map((element) => {
        temp.push(element.branch_name);
      })
    }

    else {
      data.map((element) => {
        temp.push(element.name);
      })
    }

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
    else if (type == 'sim') {
      setSimDropdownData(temp);
    }
    else if (type == 'branch') {
      setBranchNameData(temp);
    }
  }

  const clearAllData = () => {
    setSelectedImages([]);
    setSelectedItem('');
    setSelectedItemBrandName('');
    setSelectedClient('');
    setSelectedDeveloper('');
    setSelectedProjectOwner('');
    setIsDisable(false);
    setResetDropdown(!resetDropdown);
    setSelectedSimNumber('');
    setItemSerialNum('');
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


  useEffect(() => {
    if (simData.length > 0) {
      createDropdownData(simData, "sim");
    }
  }, [simData])

  useEffect(() => {
    if (branchData.length > 0) {
      createDropdownData(branchData, "branch");
    }
  }, [branchData])


  const handleImageChange = (images: []) => {
    setSelectedImages(images);
  }


  return (
    <div className={styles.baseContainer}>
      <div className={styles.secondaryContainer}>
        <h1 className={styles.title}>Assign Inventory</h1>
        <div className={styles.separator} />

        {isDisable &&
          <Loader />
        }
        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Item'} optionsData={itemData} isDisabled={isDisable} resetSelectedValue={resetDropdown} selectedValue={(value: string) => setSelectedItem(value)} />
        </div>

        {selectedItem !== 'SIM' &&
          <div className={styles.dropDownContainer}>
            <DropDownComponent label={'Item Brand Name'} optionsData={itemBrandNameData} isDisabled={isDisable} resetSelectedValue={resetDropdown} selectedValue={(value: string) => setSelectedItemBrandName(value)} />
          </div>
        }
        {/* <div className={styles.inputContainerStyle}>
          <div  className={styles.inputLabelContainer}>
            <label className={styles.inputLabel}>Item Serial no.</label>
            </div>
            <input type="text" placeholder='Enter Serial no.' className={styles.inputStyle} onChange={(e) => setItemSerialNum(e.target.value)} value={itemSerialNum} />
          </div> */}

        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Client Name'} optionsData={clientNameData} isDisabled={isDisable} resetSelectedValue={resetDropdown} selectedValue={(value: string) => setSelectedClient(value)} />
        </div>

        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Project Owner'} optionsData={projectOwnerNameData} isDisabled={isDisable} resetSelectedValue={resetDropdown} selectedValue={(value: string) => setSelectedProjectOwner(value)} />
        </div>

        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Developer'} optionsData={developerNameData} isDisabled={isDisable} resetSelectedValue={resetDropdown} selectedValue={setSelectedDeveloper} />
        </div>

        <div className={styles.dropDownContainer}>
          <DropDownComponent label={'Branch'} optionsData={branchNameData} isDisabled={isDisable} resetSelectedValue={resetDropdown} selectedValue={setSelectedBranch} />
        </div>


        {selectedItem == 'SIM' &&
          <>
            <div className={styles.dropDownContainer}>
              <DropDownComponent label={'Sim Number'} optionsData={simDropdownData} isDisabled={isDisable} resetSelectedValue={resetDropdown} selectedValue={setSelectedSimNumber} />
            </div>

          </>
        }

        <FloatingLabelInput label={'Item Serial No.'} onChange={setItemSerialNum} />

        <div className={styles.imagePickerContainer}>
          <MultipleImagePicker isDisabled={isDisable} resetSelectedImages={resetDropdown} onPickedImageChanges={(images: []) => handleImageChange(images)} />
        </div>

        <div className={styles.saveButtonContainer} >
          <button disabled={isDisable} className={styles.saveButton} onClick={addDataToDB}>Save Data</button>
        </div>
      </div>
    </div>
  )
};

export default AssignInventoryScreen;