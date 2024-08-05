import React from "react";
import "./Modal.css";
import close from "../../../Assets/close.svg";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


function Modal({heading, closeModal, children}) {
  return (
    <div className="modal-container  d-flex justify-content-center align-items-center">
      <div className="modal-box border border-1 ">
        <img
          src={close}
          alt=" "
          height={"30px"}
          className="modal-close-icon"
          onClick={closeModal}
        />
        <div className="modal-heading w-100">{heading}</div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
