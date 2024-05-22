
import './style.css'
import inventory from '../../assets/images/inventory.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const TableComponent = (props: any) => {

    const { data, showActionButtons, tableTitle, toggleModal, showAddButton } = props;

    const isSmallScreen = useMediaQuery('(max-width:690px)');

    const [tableHeading, setTableHeading] = useState([])

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

    return (
        <div className="tableStyle">

            {tableTitle &&
                <h1 className='tableTitle'>{tableTitle}:</h1>
            }

            {data && data.length > 0 ?
                <>
                    <div className='tableHeadingContainer' >
                        {tableHeading.map((item: any) => {
                            return (
                                <h1 className='tableHeading' >{item.toUpperCase()}</h1>
                            )
                        })}
                    </div>

                    {
                        data.map((val: any) => {
                            return (
                                < div className='tableDataContainer'>
                                    {Object.keys(val)?.map((key) => {
                                        return (
                                            key !== 'image' &&
                                            <h1 className='tableData' >{val[key].toString()}</h1>
                                        )
                                    })}

                                    {tableHeading.includes('image') &&
                                        <div className='tableData'  >
                                            <img src={inventory} alt="" className='itemImageStyle' />
                                        </div>
                                    }

                                    <div className='tableData'>
                                        <EditIcon sx={{ fontSize: iconSize }} className='editIcon' />
                                        <DeleteIcon sx={{ fontSize: iconSize }} className='deleteIcon' />
                                    </div>

                                </div>
                            )
                        })
                    }
                </>
                :
                <div className='noDataContainer'>
                    <h1 className='title'>No Data Found</h1>
                </div>
            }

            {data && data.length > 0 && showAddButton &&
                <div className='addButtonContainer'>
                    <div className='addButton'>
                        <ControlPointIcon sx={{ fontSize: iconSize }} />
                        <button className='addButtonText' onClick={() => toggleModal(tableTitle)}>Add More</button>
                    </div>
                </div>
            }
        </div>

    );
};

export default TableComponent;
