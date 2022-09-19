import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
// import DiscountGroups from "../components/Content/DiscountGroups";
import Footer from "../components/Content/Footer";
import Menu from "../components/Menu/Menu";
import Search from "../components/Search/Search";
import Content from "../components/UI/Content";
import Page from "../components/UI/Page";
import { UPDATE_PASSWORD_API } from "../Endpoints";

const ResetFormPage = () => {
  const navigate = useNavigate();
  // get parameter from url using useParams hook which returns an object
  const param = useParams();
  const [errorMsg, setErrorMsg] = useState({
    pwd: "",
    repeatPwd: "",
  });
  const passwordInputRef = useRef();
  const repeatPasswordInputRef = useRef();

  const retrievePasswordHandler = (e) => {
    e.preventDefault();
    const passwordInput = passwordInputRef.current.value;
    const repeatPasswordInput = repeatPasswordInputRef.current.value;
    // Validate password
    const validatePwd = () => {
      // iniitialize function return value
      var status = false;
      // check if password is empty
      if (passwordInput) {
        // check password length min = 4 max = 50
        if (passwordInput.length >= 4 && passwordInput.length <= 50) {
          // Verify repeat password value and password value if the match.
          if (repeatPasswordInput && passwordInput == repeatPasswordInput) {
            // Update useState value for repeat password and password
            setErrorMsg((prev) => {
              return {
                pwd: "",
                repeatPwd: "",
              };
            });
            // update function return value
            status = true;
          } else {
            setErrorMsg((prev) => {
              return {
                pwd: "",
                repeatPwd: "Password mismatch",
              };
            });
          }
        } else {
          // Update error message for password
          setErrorMsg((prev) => {
            return {
              ...prev,
              pwd: "Invalid password length. (min 4 and max 50)",
            };
          });
        }
      } else {
        // Update error message for password
        setErrorMsg((prev) => {
          return {
            ...prev,
            pwd: "Password is required",
          };
        });
      }
      return status;
    };

    if (validatePwd()) {
      const data = {
        email: param.email,
        cipher_text: param.cipher_text,
        expiry_date: param.expiry_date,
        new_password: passwordInput,
      };
      save_data(data);
    }
  };

  // SAVE DATA
  const save_data = (d) => {
    // Call API endpoint for user registration
    fetch(UPDATE_PASSWORD_API, {
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
          const userRecords = actualData.data;
          alert(actualData.msg);
          // Load home page
          navigate("/");
        }
        // Catch errors here
        else {
          // Email exist
          if (actualData.status == 401) {
            setErrorMsg((prev) => {
              return {
                ...prev,
                pwd: actualData.msg,
              };
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Page>
      <Content>
        <MDBCard
          style={{
            maxWidth: "75rem",
            height: "90vh",
          }}
        >
          <MDBCardBody>
            <MDBContainer
              style={{
                width: "40%",
                marginTop: "10%",
              }}
            >
              <h4>Update password</h4>
              <br />
              <MDBRow>
                <MDBCol className="mt-1">
                  <form onSubmit={retrievePasswordHandler}>
                    {/* Password */}
                    <label className="grey-text">
                      Password{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgb(161, 64, 64)",
                        }}
                      >
                        {errorMsg.pwd ? errorMsg.pwd : ""}
                      </span>
                    </label>
                    <input
                      type="password"
                      className={`form-control input`}
                      ref={passwordInputRef}
                    />

                    <br />
                    {/* Repeat Password */}
                    <label className="grey-text">
                      Repeat Password{" "}
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgb(161, 64, 64)",
                        }}
                      >
                        {errorMsg.repeatPwd ? errorMsg.repeatPwd : ""}
                      </span>
                    </label>
                    <input
                      type="password"
                      className={`form-control input`}
                      ref={repeatPasswordInputRef}
                    />
                    <br />

                    <MDBBtn
                      color="dark"
                      type="submit"
                      className="py-3"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      UPDATE PASSWORD
                    </MDBBtn>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBCardBody>
        </MDBCard>
      </Content>
      <Footer />
    </Page>
  );
};

export default ResetFormPage;
