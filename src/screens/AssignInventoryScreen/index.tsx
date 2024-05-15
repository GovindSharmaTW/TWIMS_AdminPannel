import DropDownComponent from '../../components/DropDownComponent';
import { addDataToFirebaseDB } from '../../firebase';
import './style.css'

import { Dropdown } from 'primereact/dropdown';


const AssignInventoryScreen = () => {
  const itemData = ['Laptop', 'Conector', 'Charger', 'SIM', 'Mouse', 'keyboard', 'MacBook Pro'];
  const itemBrandNameData = ['HP', 'AVITA', 'DELL', 'LENOVO', 'APPLE'];
  const clientNameData = ['Karigar', 'Plate Rate', 'Auto Zone', 'Latitude Pay', 'CoderWin'];
  const projectOwnerNameData = ['Mukul Pande', 'Arpita', 'Aksh'];
  const developerNameData = ['Govind Sharma', 'Aayush Chourasiya', 'Shiv', 'Aditya'];

  const addDataToDB = () => {
    addDataToFirebaseDB();
  }

  return (
    <div className='baseContainer'>
      <div className='secondaryContainer'>
        <h1 className='title'>Assign Inventory</h1>
        <div className='separator' />
        <div className='inputContainer'>
          <DropDownComponent label={'Item'} optionsData={itemData} />
        </div>

        <div className='inputContainer'>
          <DropDownComponent label={'Item Brand Name'} optionsData={itemBrandNameData} />
        </div>

        <div className='inputContainer'>
          <DropDownComponent label={'Client Name'} optionsData={clientNameData} />
        </div>

        <div className='inputContainer'>
          <DropDownComponent label={'Project Owner'} optionsData={projectOwnerNameData} />
        </div>

        <div className='inputContainer'>
          <DropDownComponent label={'Developer'} optionsData={developerNameData} />
        </div>

        <div className='loginButtonContainer' >
          <button className='loginButton' onClick={addDataToDB}>Save Data</button>
        </div>
      </div>
    </div>
  )
};

export default AssignInventoryScreen;