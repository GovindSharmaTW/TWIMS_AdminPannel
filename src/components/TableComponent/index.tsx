
import '../../index.css'

const TableComponent = (props) => {
    const { data = [], tableHeadingData = [], showButtons = false } = props

    return (
        <div className="heading">
            <table id="tableNewStyle">
                <tr>
                    {tableHeadingData.map((item) => {
                        return (
                            <th>{item.heading}</th>)
                    })}
                </tr>
                
                {data.map((val, key) => {
                    return (
                        <>
                            <tr style={{ justifyContent: 'center' }} key={key}>
                                {Object.keys(val).map((keys) => {
                                    return (
                                        <td style={{ textAlign: 'center' }}>{val[keys]}</td>
                                    )
                                })}

                                {showButtons &&
                                    <td style={{ display: 'flex', justifyContent: 'center' }} className=''>
                                        <button className='editButton'>Edit</button>
                                        <button className='deleteButton'>Delete</button>
                                    </td>
                                }
                            </tr>
                        </>

                    )
                })}

                <tr>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}></td>
                    <td style={{ textAlign: 'center' }}><button className='addButton'>Add New</button></td>

                </tr>


            </table>
            {/* <div style={{width:'81%',display:'flex', justifyContent:'flex-end',}}>
            <button className='addButton'>Add New</button>
            </div> */}
        </div>
    );
};

export default TableComponent;
