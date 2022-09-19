import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import style from "./RegForm.modules.css";
import StatusDisplayModal from "../Modal/StatusDisplayModal";
import { RETRIEVE_PWD_API } from "../../Endpoints";

const RetrievePwdForm = (props) => {
  const emailInputRef = useRef();
  const [errorMsg, setErrorMsg] = useState("");

  // SEND DATA
  const retrievepwd_api = (d) => {
    // Call API endpoint for password retrieval
    fetch(RETRIEVE_PWD_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    })
      .then((response) => response.json())
      .then((actualData) => {
        // if status is 200
        if (actualData.status == 200) {
          // TODO:: call a modal
          console.log(actualData.msg);
          alert(actualData.msg);
          props.closeModalfn();
        }
        // Catch errors here
        else {
          // Email exist
          if (actualData.status == 401) {
            setErrorMsg(actualData.msg);
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //   Form submit handler
  const retrievePasswordHandler = (e) => {
    e.preventDefault();

    const emailInput = emailInputRef.current.value;

    const validateEmail = () => {
      var status = false;
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailInput) {
        if (emailInput.match(mailformat)) {
          setErrorMsg("");
          status = true;
        } else {
          // Invalid email format
          setErrorMsg("Invalid email format");
        }
      } else {
        // Email is required
        setErrorMsg("Email is required");
      }
      return status;
    };

    if (validateEmail()) {
      const data = {
        _email: emailInput,
      };
      retrievepwd_api(data);
      console.log("Call API");
    }
  };

  return (
    <MDBCard style={{ maxWidth: "75rem" }}>
      <MDBCardBody>
        <MDBContainer>
          <MDBRow>
            <MDBCol className="mt-1">
              <form onSubmit={retrievePasswordHandler}>
                {/* Email */}
                <label className="grey-text">
                  Email{" "}
                  <span style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                    {errorMsg ? errorMsg : ""}
                  </span>
                </label>
                <input
                  type="email"
                  className={`form-control input`}
                  ref={emailInputRef}
                />
                <br />

                <MDBBtn
                  color="dark"
                  type="submit"
                  className="w-50 py-3"
                  style={{
                    fontSize: "14px",
                  }}
                >
                  RETRIEVE PASSWORD
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBCardBody>
    </MDBCard>
  );
};

export default RetrievePwdForm;
