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
import { ADMIN_UPDATE_USER_ACCESS } from "../../../Endpoints";

const UpdateAccessModal = (props) => {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const data = {
    is_admin: props.is_admin,
    email: props.email,
  };

  const updateHandler = () => {
    fetch(ADMIN_UPDATE_USER_ACCESS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status == 200) {
        props.getDatafn();
        handleClose();
      }
    });
  };

  return (
    <>
      <MDBBtn outline color="dark" className="me-2" onClick={handleShow}>
        <FontAwesomeIcon icon={faPencil} /> Edit PRIVILEGE
      </MDBBtn>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body className="d-flex justify-content-center">
          <div>
            <div>User : {props.name}</div>
            <div>Email : {props.email}</div>

            <div>Privilege : {props.is_admin ? "Admin" : "User"}</div>
            <br />
            <MDBBtn
              color="dark"
              outline
              onClick={handleClose}
              className="me-2 "
              style={{ fontSize: "14px" }}
            >
              CANCEL
            </MDBBtn>
            <MDBBtn
              color={props.is_admin ? "danger" : "dark"}
              onClick={updateHandler}
              style={{ fontSize: "14px" }}
            >
              {props.is_admin ? "DOWN GRADE ACCESS" : "UPGRADE ACCESS"}
            </MDBBtn>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateAccessModal;
