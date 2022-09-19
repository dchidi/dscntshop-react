import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { MDBNavbarItem, MDBNavbarLink } from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import RegForm from "../Forms/RegForm";
import LoginForm from "../Forms/LoginForm";
import RetrievePwdForm from "../Forms/RetrievePwdForm";

const RegLoginModal = (props) => {
  const [showModal, setShow] = useState(false);
  const [showForm, setShowForm] = useState("login");

  const handleClose = () => {
    setShow(false);
    setShowForm("login");
  };
  const handleShow = () => setShow(true);
  const showRegForm = () => setShowForm("register user");
  const showLoginForm = () => setShowForm("login");
  const showRetrieveForm = () => setShowForm("retrieve password");

  var formContainer = (
    <LoginForm
      closeModalfn={handleClose}
      showformfn={showRegForm}
      retrievepwdfn={showRetrieveForm}
    />
  );

  if (showForm && showForm === "register user") {
    formContainer = (
      <RegForm closeModalfn={handleClose} backfn={showLoginForm} />
    );
  } else if (showForm === "retrieve password") {
    formContainer = (
      <RetrievePwdForm closeModalfn={handleClose} backfn={showLoginForm} />
    );
  }

  return (
    <>
      <MDBNavbarItem className="ms-md-5 me-3">
        <MDBNavbarLink href="#" onClick={handleShow}>
          Login
        </MDBNavbarLink>
      </MDBNavbarItem>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Link to="#" onClick={showLoginForm}>
            {showForm !== "login" && <FontAwesomeIcon icon={faArrowLeftLong} />}{" "}
            &nbsp;
            {showForm ? showForm.toUpperCase() : ""}
          </Link>
        </Modal.Header>
        <Modal.Body>{formContainer}</Modal.Body>
      </Modal>
    </>
  );
};

export default RegLoginModal;
