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
import { DELETE_PRODUCT_API } from "../../Endpoints";

// import EditCategoryForm from "../Forms/EditCategoryForm";

const DeleteProductModal = (props) => {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteProductHandler = () => {
    const data = {
      id: props.product_id,
    };

    console.log(data);

    fetch(DELETE_PRODUCT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        props.getDataFn();
        handleClose();
      }
    });
  };

  return (
    <>
      {/* <MDBBtn outline color="danger" className="px-3 ms-2" onClick={handleShow}>
        <FontAwesomeIcon icon={faTrash} /> Delete
      </MDBBtn> */}
      <MDBBtn className="m-1" color="danger" onClick={handleShow}>
        <FontAwesomeIcon icon={faTrash} />
      </MDBBtn>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DELETE PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mt-3 mb-5" style={{ color: "#880e4f" }}>
            Click DELETE to continue deleting PRODUCT
          </h5>
          <MDBBtn
            outline
            color="defaultd"
            onClick={handleClose}
            className="me-2"
          >
            <FontAwesomeIcon icon={faCancel} /> CANCEL
          </MDBBtn>
          <MDBBtn color="dark" onClick={deleteProductHandler}>
            <FontAwesomeIcon icon={faCheckDouble} /> DELETE
          </MDBBtn>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
