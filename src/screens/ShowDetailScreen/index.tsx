import styles from './styles.module.css';
import inventory from '../../assets/images/inventory.jpg';
import { useLocation, useParams } from 'react-router-dom';
import { checkIsEmpty } from '../../utils';

const ShowDetailsScreen
  = () => {
    // const data = { name: "Govind Sharma", total_ass_item_count: 10, total_ass_project: 3, project: ['Karigar', 'plateRate', 'CanDid'], ass_items: ['laptop', 'Connector', 'Mouse'] }
    const location = useLocation();
    const { data } = location.state;

    console.log(">>>>>>>>>>", data);

    return (
      <div className={styles.baseContainer}>

        <h1 className={styles.headingStyle}>Assigned Details</h1>
        
        <div className={styles.cardContainer}>
          {data.ass_items.map((item:object) => (
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
              </div>
            </div>
          ))
          }
        </div>


      </div>
    );
  }

export default ShowDetailsScreen
  ;
