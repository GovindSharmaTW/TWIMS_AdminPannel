import styles from './styles.module.css';
import inventory from '../../assets/images/inventory.jpg';
import { useLocation, useParams } from 'react-router-dom';
import { checkIsEmpty } from '../../utils';
import { useSelector } from 'react-redux';

const ShowDetailsScreen
  = () => {
    const location = useLocation();
    const { data } = location.state;

    const inventoryItemData = useSelector((state: RootState) => state.inventory.inventoryItems);


    return (
      <div className={styles.baseContainer}>

        <h1 className={styles.headingStyle}>Assigned Details</h1>

        <div className={styles.cardContainer}>
          {data.ass_items.map((item: object) => {

            const itemData = inventoryItemData.find((element) => element.item_serial_number === item.item_serial_num);

            return (
              <div className={styles.dataContainer}>
                <div className={styles.subContainer}>
                  <div className={styles.textContainer}>
                    <h1 className={styles.heading}>Developer : </h1>
                    <h1 className={styles.subHeading}>{data.name}</h1>
                  </div>

                  <div className={styles.textContainer}>
                    <h1 className={styles.heading}>item : </h1>
                    <h1 className={styles.subHeading}>{item.item}</h1>
                  </div>

                  {
                    !checkIsEmpty(item.client) &&
                    <div className={styles.textContainer}>
                      <h1 className={styles.heading}>Brand Name : </h1>
                      <h1 className={styles.subHeading}>{item.brand}</h1>
                    </div>
                  }

                  <div className={styles.textContainer}>
                    <h1 className={styles.heading}>Item Serial No. : </h1>
                    <h1 className={styles.subHeading}>{item.item_serial_num}</h1>
                  </div>

                  {
                    itemData &&

                    <>
                      <div className={styles.textContainer}>
                        <h1 className={styles.heading}>Price : </h1>
                        <h1 className={styles.subHeading}>
                          {itemData && itemData.price}
                        </h1>
                      </div>

                      <div className={styles.textContainer}>
                        <h1 className={styles.heading}>Configuration : </h1>
                        <h1 className={styles.subHeading}>
                          {itemData && itemData.configuration}
                        </h1>
                      </div>
                    </>


                  }





                  <div className={styles.textContainer}>
                    <h1 className={styles.heading}>Assigned Date : </h1>
                    <h1 className={styles.subHeading}>{item.ass_date}</h1>
                  </div>

                  {
                    !checkIsEmpty(item.client) &&
                    <div className={styles.textContainer}>
                      <h1 className={styles.heading}> Client : </h1>
                      <h1 className={styles.subHeading}>{item.client}</h1>
                    </div>
                  }

                  {
                    !checkIsEmpty(item.client) &&
                    <div className={styles.textContainer}>
                      <h1 className={styles.heading}> Project Owner : </h1>
                      <h1 className={styles.subHeading}>{item.project_owner}</h1>
                    </div>
                  }

                  {(item.item_image_urls !== undefined && typeof (item.item_image_urls) != 'string') &&

                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                      <div className={styles.textContainer}>
                        <h1 className={styles.heading}>Image : </h1>
                      </div>
                      {item.item_image_urls.map((image, index) => (
                        <div key={index} style={{ position: 'relative', margin: '10px' }}>
                          <img
                            src={image.uri}
                            alt={`Selected ${index}`}
                            style={{ width: '100%', height: '100px', objectFit: 'contain' }}
                          />
                          <div>
                          </div>
                        </div>
                      ))}

                    </div>
                  }

                </div>
              </div>
            )
          })
          }
        </div>


      </div>
    );
  }

export default ShowDetailsScreen
  ;
