import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { MDBNavbarItem, MDBNavbarLink, MDBBtn } from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const StatusDisplayModal = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    // close the parent modal
    props.closeModal();
    // close current modal
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  return (
    <>
      <MDBNavbarItem className="ms-md-5 me-3">
        <MDBNavbarLink href="#" onClick={handleShow}>
          Message!!!
        </MDBNavbarLink>
      </MDBNavbarItem>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <div>{props.msg}</div>
          <MDBBtn
            color="dark"
            outline
            onClick={handleClose}
            className="w-50 py-3"
            style={{
              fontSize: "14px",
            }}
          >
            CLOSE
          </MDBBtn>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StatusDisplayModal;
