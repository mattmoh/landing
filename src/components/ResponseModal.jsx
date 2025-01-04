import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ResponseModal = ({ isOpen, onRequestClose, message }) => {
return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Response Message"
        style={{
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '20px',
                padding: '80px',
            },
        }}
    >
        <div>{message}</div>
        <button onClick={onRequestClose}>Close</button>
    </Modal>
);
};

export default ResponseModal;