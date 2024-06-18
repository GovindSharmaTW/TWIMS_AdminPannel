import spinner from '../../assets/spinner.svg';

import './style.css'

export const Loader = () => {
    return (
        <div className='spinnerContainer'>
            <img src={spinner} alt="" />
        </div>

    )
}