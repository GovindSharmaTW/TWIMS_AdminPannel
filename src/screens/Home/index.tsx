import { useEffect } from 'react';
import { addInventoryItem, decrement, increment, incrementByAmount } from '../../redux/inventorySlice';
import { RootState } from '../../redux/store';
import './style.css';
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const count = useSelector((state: RootState) => state.inventory.value);

  const dispatch = useDispatch();
  return (
    <div className='baseContainer'>
      <button className='buttonStyle' onClick={() => dispatch(increment())}>+</button>
      <p>Home screen {count}</p>
      <button className='buttonStyle' onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
};

export default Home;