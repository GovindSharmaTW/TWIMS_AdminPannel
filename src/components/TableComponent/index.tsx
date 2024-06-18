
import styles from './style.module.css'
import inventory from '../../assets/images/inventory.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { assignedItemDetailsRef, clientsRef, developerRef, inventoryItemsBrandNameRef, inventoryItemsRef, projectOwnerRef,simRef } from '../../firebase/firebaseConstants';
import { deleteDataFromFirebaseDB } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../ModalComponent';
import { toast } from 'react-toastify';

const TableComponent = (props: any) => {

    const navigate = useNavigate();

    const { data, showActionButtons, tableTitle, toggleModal, showAddButton } = props;

    const isSmallScreen = useMediaQuery('(max-width:690px)');

    const [tableHeading, setTableHeading] = useState([])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [del_data, setDel_data] = useState({});


    const iconSize = isSmallScreen ? 18 : 25;

    useEffect(() => {
        if (data.length > 0) {
            const dataKeys = Object.keys(data[0]);

            if (showActionButtons) {
                dataKeys.push('Actions');
            }

            setTableHeading(dataKeys);
        }
    }, [data])

    const openShowDetailScreen = (item: object) => {
        if (item.ass_items !== undefined) {
            navigate("/ShowDetail", { state: { data: item } })
        }
        else {
            toast.error('No Data found to display')
        }
    }

    const deleteData = (id: string, tableType: string) => {

        let dbRef = ''

        if (tableType == 'Item List') {
            dbRef = inventoryItemsRef;
        }
        else if (tableType == 'Brand List') {
            dbRef = inventoryItemsBrandNameRef;
        }
        else if (tableType == 'Developer List') {
            dbRef = developerRef;
        }
        else if (tableType == 'Project-Owner List') {
            dbRef = projectOwnerRef;
        }
        else if (tableType == 'Assigned Inventory List') {
            dbRef = assignedItemDetailsRef;
        }
        else if (tableType == 'Client List') {
            dbRef = clientsRef;
        }
        else if (tableType == 'Sim List') {
            dbRef = simRef;
        }

        deleteDataFromFirebaseDB(dbRef, id);
        handleModalClose();
    }

    const deleteItemModalChildComponent = () => {
        return (
            <div>
                <div className={styles.modellnputContainerStyle}>
                    <label className={styles.modalTitle}>
                        Do you really want to delete this data ?
                    </label>
                </div>

                <div className={styles.buttonContainer}>
                    <div className={styles.modalButtonContainer}>
                        <button className={styles.buttonText} onClick={() => handleModalClose()}>Cancel</button>
                    </div>

                    <div className={styles.modalButtonContainer}>
                        <button className={styles.buttonText} onClick={() => { deleteData(del_data.id, del_data.tableTitle) }}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }

    const handleModalClose = (deletetingData?: {}) => {
        setIsModalVisible(!isModalVisible);

        if (deletetingData) {
            setDel_data(deletetingData)
        }
    }

    return (
        <div className="tableStyle">

            <ModalComponent childComponent={deleteItemModalChildComponent} openModal={isModalVisible} handleModalClose={handleModalClose} />

            {tableTitle &&
                <h1 className={styles.tableTitle}>{tableTitle}:</h1>
            }

            {data && data.length > 0 ?
                <>
                    <div className={styles.tableHeadingContainer} >
                        {tableHeading.map((item: any) => {
                            return (
                                <>
                                    {item !== 'id' && item !== 'item_image_urls' && item !== 'client_name' && item !== 'ass_items' &&
                                        <h1 className={styles.tableHeading} >{item.toUpperCase()}</h1>
                                    }
                                </>
                            )
                        })}
                    </div>

                    {
                        data.map((val: any) => {
                            return (
                                < div className={styles.tableDataContainer}>

                                    {Object.keys(val)?.map((key) => {
                                        return (
                                            key !== 'image' && key !== 'id' && key !== 'item_image_urls' && key !== 'client_name' && key !== 'ass_items' &&
                                            <h1 className={styles.tableData} >{val[key].toString()}</h1>
                                        )
                                    })}

                                    {tableHeading.includes('image') &&
                                        <div className={styles.tableData}  >
                                            <img src={inventory} alt="" className={styles.itemImageStyle} />
                                        </div>
                                    }

                                    <div className={styles.tableData}>
                                       
                                        <>
                                            <button onClick={() => toggleModal({ tableTitle, val })}><EditIcon sx={{ fontSize: iconSize }} className={styles.editIcon} /></button>
                                            <button onClick={() => handleModalClose({ id: val.id, tableTitle: tableTitle })}><DeleteIcon sx={{ fontSize: iconSize }} className={styles.deleteIcon} /></button>

                                        </>

                                        {
                                            tableTitle == 'Developer List' &&

                                            <button onClick={() => openShowDetailScreen(val)}><ArrowForwardIosIcon sx={{ fontSize: iconSize }} className={styles.arrowIcon} /></button>
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
                :
                <div className={styles.noDataContainer}>
                    <h1 className={styles.title}>No Data Found</h1>
                </div>
            }

            {data && showAddButton &&
                <div className={styles.addButtonContainer}>
                    <div className={styles.addButton}>
                        <ControlPointIcon sx={{ fontSize: iconSize }} />
                        <button className={styles.addButtonText} onClick={() => toggleModal({ tableTitle })}>{data.length == 0 ? 'Add New Data' : 'Add More'}</button>
                    </div>
                </div>
            }

        </div>

    );
};

export default TableComponent;
