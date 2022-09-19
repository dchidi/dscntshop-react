import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  // MDBContainer,
  // MDBRow,
  // MDBCol,
  MDBBtn,
  // MDBCard,
  // MDBCardBody,
  // MDBCardTitle,
  // MDBTable,
  // MDBTableBody,
  // MDBTableHead,
} from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCheckDouble,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ADMIN_DELETE_CATEGORY } from "../../../Endpoints";

// import EditCategoryForm from "../Forms/EditCategoryForm";

const DeleteCategoryModal = (props) => {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateCategoryHandler = (e) => {
    e.preventDefault();
    const data = {
      category: props.category,
      brand: props.brand,
    };

    fetch(ADMIN_DELETE_CATEGORY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 200) {
        props.getDatafn();
        handleClose();
      }
    });
  };

  return (
    <>
      <MDBBtn outline color="danger" className="me-2" onClick={handleShow}>
        <FontAwesomeIcon icon={faTrash} /> Delete
      </MDBBtn>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mt-3 mb-5" style={{ color: "#880e4f" }}>
            You are about to delete {props.category.toUpperCase()} category
            under {props.brand.toUpperCase()} brand !!!
          </h5>
          <MDBBtn
            outline
            color="defaultd"
            onClick={handleClose}
            className="me-2"
          >
            <FontAwesomeIcon icon={faCancel} /> CANCEL
          </MDBBtn>
          <MDBBtn color="dark" onClick={updateCategoryHandler}>
            <FontAwesomeIcon icon={faCheckDouble} /> DELETE
          </MDBBtn>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteCategoryModal;
