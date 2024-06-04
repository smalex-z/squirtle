// Modal.js
import React from 'react';
import "./modalStyles.css";

const Modal = ({ show, handleClose, children }) => {
    return (
        <div className={`modal ${show ? "show" : ""}`}>
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default Modal;
