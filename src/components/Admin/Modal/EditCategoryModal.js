import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import EditCategoryForm from "../Forms/EditCategoryForm";

const EditCategoryModal = (props) => {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <MDBBtn outline color="dark" className="me-2" onClick={handleShow}>
        <FontAwesomeIcon icon={faPencil} /> Edit
      </MDBBtn>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCategoryForm
            category={props.category}
            brand={props.brand}
            getDatafn={props.getDatafn}
            closeModalfn={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditCategoryModal;
