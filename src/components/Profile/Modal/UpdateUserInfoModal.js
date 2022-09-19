import React, { useState, useRef, useContext } from "react";
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
import {
  faPencil,
  faTrash,
  faEdit,
  faFloppyDisk,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import context from "react-bootstrap/esm/AccordionContext";
import DscntshopContext from "../../../store/dscntshop-context";
import { UPDATE_USER_API } from "../../../Endpoints";

const UpdateUserInfoModal = (props) => {
  const ctx = useContext(DscntshopContext);
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const emailInputRef = useRef();

  const data = {
    is_admin: props.is_admin,
    email: props.email,
  };

  // Manage error display
  const [errorMsg, setErrorMsg] = useState({
    _name: "",
    _phone: "",
  });

  const updateHandler = (e) => {
    e.preventDefault();

    const name = nameInputRef.current.value;
    const phone = phoneInputRef.current.value;
    const email = emailInputRef.current.value;

    // validate fullname
    const validateFullname = () => {
      let status = false;
      if (name) {
        setErrorMsg((prev) => {
          return {
            ...prev,
            _name: "",
          };
        });
        status = true;
      } else {
        // Fullname field is required
        setErrorMsg((prev) => {
          return {
            ...prev,
            _name: "phone field is required",
          };
        });
      }
      return status;
    };

    // validate phone
    const validatePhone = () => {
      let status;
      const phonePattern =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (phone) {
        if (phone.length >= 9 && phone.length <= 18) {
          if (phone.match(phonePattern)) {
            setErrorMsg((prev) => {
              return {
                ...prev,
                _phone: "",
              };
            });
            status = true;
          } else {
            // phone should be at least 4 characters long
            setErrorMsg((prev) => {
              return {
                ...prev,
                _phone: "Invalid phone format. Allowed format (xxx xxx xxxxxx)",
              };
            });
          }
        } else {
          // phone should be at least 4 characters long
          setErrorMsg((prev) => {
            return {
              ...prev,
              _phone: "Invalid phone length. (min 9 & max 18)",
            };
          });
        }
      } else {
        // phone is required
        setErrorMsg((prev) => {
          return {
            ...prev,
            _phone: "phone field is required",
          };
        });
      }
      return status;
    };

    // Call form validation methods
    const isFullnameValid = validateFullname();
    const isphoneValid = validatePhone();

    if (isFullnameValid && isphoneValid) {
      fetch(UPDATE_USER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email,
        }),
      })
        .then((response) => response.json())
        .then((actualData) => {
          const userRecords = actualData.data;
          const _cart = [...ctx.cart, ...userRecords.cart];

          // console.log(userRecords.is_super_admin);

          // update global context values
          const ctxData = {
            isLoggedIn: ctx.isLoggedIn,
            isAdmin: userRecords.is_admin,
            isSuperAdmin: userRecords.is_super_admin,
            isVerified: userRecords.is_verified,
            userInfo: {
              name: userRecords.name,
              email: userRecords.email,
              phone: userRecords.phone,
              id: userRecords.id,
              is_verified: userRecords.is_verified,
              date_created: userRecords.date_created,
              is_admin: userRecords.is_admin,
            },
            cart: _cart,
            search: userRecords.search,
            filters: ctx.filters,
            filtersValue: ctx.filtersValue,
            settings: ctx.settings,
          };

          localStorage.setItem("userinfo", JSON.stringify(ctxData));

          ctx.updateContext(ctxData);
          alert(actualData.msg);

          handleClose();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <>
      <MDBBtn
        outline
        color="outline"
        className="px-2 py-1 ms-auto"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faEdit} />
      </MDBBtn>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {/* {JSON.stringify(props.info)} */}
          <form onSubmit={updateHandler}>
            {/* Category */}
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Email{" "}
              <span style={{ fontSize: "12px", color: "#c34e61" }}>
                cannot be edited
              </span>
            </label>
            {/* using defaultValue to allow users the ability to change the value */}
            <input
              type="text"
              className={`form-control input`}
              value={props.info.email}
              ref={emailInputRef}
            />
            <br />
            {/* Category */}
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Fullname{" "}
              <span style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                {errorMsg && errorMsg._name ? errorMsg._name : ""}
              </span>
            </label>
            {/* using defaultValue to allow users the ability to change the value */}
            <input
              type="text"
              className={`form-control input`}
              defaultValue={props.info.name}
              ref={nameInputRef}
            />
            <br />
            {/* Brand */}
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
              Phone{" "}
              <span style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                {errorMsg && errorMsg._phone ? errorMsg._phone : ""}
              </span>
            </label>
            {/* using value here so that user cannot change it */}
            <input
              type="text"
              className={`form-control input`}
              defaultValue={props.info.phone}
              ref={phoneInputRef}
            />
            <br />
            <MDBBtn
              outline
              color="dark"
              type="submit"
              className="me-2"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faCancel} /> Cancel
            </MDBBtn>
            <MDBBtn outline color="dark" type="submit">
              <FontAwesomeIcon icon={faFloppyDisk} /> Update
            </MDBBtn>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateUserInfoModal;
