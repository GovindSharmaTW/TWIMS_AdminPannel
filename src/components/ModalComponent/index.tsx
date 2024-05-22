import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './style.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4
};

export default function ModalComponent({ childComponent = '', openModal = false, handleModalClose = () => { } }) {
    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} className='modalStyle'>
                    {childComponent}
                </Box>
            </Modal>
        </div>
    );
}
