import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

import style from "./Forms.modules.css";
import DscntshopContext from "../../store/dscntshop-context";
import { REGISTER_API } from "../../Endpoints";

const RegForm = (props) => {
  const ctx = useContext(DscntshopContext);

  // Initialize input field variables using useRef hooks for easy retrieval
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const passwordInputRef = useRef();
  const repeatPasswordInputRef = useRef();

  // Manage error display
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });

  // SAVE DATA
  const save_data = (d) => {
    // Call API endpoint for user registration
    fetch(REGISTER_API, {
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
          const _cart = [...ctx.cart, ...userRecords.cart];

          // update global context values
          const ctxData = {
            isLoggedIn: true,
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

          alert("User record created successfuly");

          props.closeModalfn();
        }
        // Catch errors here
        else {
          // Email exist
          if (actualData.status == 401) {
            setErrorMsg((prev) => {
              return {
                ...prev,
                email: actualData.msg,
              };
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Form submit handler
  const registerUserHandler = (e) => {
    // prevent form submit default behaviour
    e.preventDefault();

    // Get input field value using useRef hook
    const nameInput = nameInputRef.current.value;
    const emailInput = emailInputRef.current.value;
    const phoneInput = phoneInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;
    const repeatPasswordInput = repeatPasswordInputRef.current.value;

    // VALIDATE USER INPUTS
    // Validate password
    const validatePwd = () => {
      // iniitialize function return value
      let status = false;
      // check if password is empty
      if (passwordInput) {
        // check password length min = 4 max = 50
        if (passwordInput.length >= 4 && passwordInput.length <= 50) {
          // Verify repeat password value and password value if the match.
          if (repeatPasswordInput && passwordInput == repeatPasswordInput) {
            // Update useState value for repeat password and password
            setErrorMsg((prev) => {
              return {
                ...prev,
                password: "",
                repeatPassword: "",
              };
            });
            // update function return value
            status = true;
          } else {
            setErrorMsg((prev) => {
              return {
                ...prev,
                password: "",
                repeatPassword: "Password mismatch",
              };
            });
          }
        } else {
          // Update error message for password
          setErrorMsg((prev) => {
            return {
              ...prev,
              password: "Invalid password length. (min 4 and max 50)",
            };
          });
        }
      } else {
        // Update error message for password
        setErrorMsg((prev) => {
          return {
            ...prev,
            password: "Password is required",
          };
        });
      }
      return status;
    };

    // validate fullname
    const validateFullname = () => {
      let status = false;
      if (nameInput) {
        setErrorMsg((prev) => {
          return {
            ...prev,
            name: "",
          };
        });
        status = true;
      } else {
        // Fullname field is required
        setErrorMsg((prev) => {
          return {
            ...prev,
            name: "name field is required",
          };
        });
      }
      return status;
    };

    const validateEmail = () => {
      let status = false;
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (emailInput) {
        if (emailInput.match(mailformat)) {
          setErrorMsg((prev) => {
            return {
              ...prev,
              email: "",
            };
          });
          status = true;
        } else {
          // Invalid email format
          setErrorMsg((prev) => {
            return {
              ...prev,
              email: "Invalid email format",
            };
          });
        }
      } else {
        // Email is required
        setErrorMsg((prev) => {
          return {
            ...prev,
            email: "Email is required",
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
      if (phoneInput) {
        if (phoneInput.length >= 9 && phoneInput.length <= 18) {
          if (phoneInput.match(phonePattern)) {
            setErrorMsg((prev) => {
              return {
                ...prev,
                phone: "",
              };
            });
            status = true;
          } else {
            // phone should be at least 4 characters long
            setErrorMsg((prev) => {
              return {
                ...prev,
                phone: "Invalid phone format. Allowed format (xxx xxx xxxxxx)",
              };
            });
          }
        } else {
          // phone should be at least 4 characters long
          setErrorMsg((prev) => {
            return {
              ...prev,
              phone: "Invalid phone length. (min 9 & max 18)",
            };
          });
        }
      } else {
        // phone is required
        setErrorMsg((prev) => {
          return {
            ...prev,
            phone: "phone is required",
          };
        });
      }
      return status;
    };

    // Save form value into an object
    const data = {
      _phone: phoneInput,
      _password: passwordInput,
      _name: nameInput,
      _email: emailInput,
    };

    // Call form validation methods
    const isEmailValid = validateEmail();
    const isFullnameValid = validateFullname();
    const isPwdValid = validatePwd();
    const isphoneValid = validatePhone();

    // Check if all fields passed the validation parameters
    if (isEmailValid && isFullnameValid && isPwdValid && isphoneValid) {
      // save data into DB
      save_data(data);
    }
  };

  return (
    <MDBCard style={{ maxWidth: "75rem" }}>
      <MDBCardBody>
        <MDBContainer>
          <MDBRow>
            <MDBCol className="mt-1">
              <form onSubmit={registerUserHandler} autoComplete="off">
                {/* Full Name */}
                <label className="grey-text">
                  Full Name{" "}
                  <span style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                    {errorMsg && errorMsg.name ? errorMsg.name : ""}
                  </span>
                </label>
                <input
                  type="text"
                  className={`form-control input`}
                  ref={nameInputRef}
                  autoComplete="new-password"
                />
                <br />

                {/* Email */}
                <label className="grey-text">
                  Email{" "}
                  <span style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                    {errorMsg && errorMsg.email ? errorMsg.email : ""}
                  </span>
                </label>
                <input
                  type="email"
                  className={`form-control input`}
                  ref={emailInputRef}
                  autoComplete="new-password"
                />
                <br />
                {/* phone */}
                <label className="grey-text">
                  phone{" "}
                  <span style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                    {errorMsg && errorMsg.phone ? errorMsg.phone : ""}
                  </span>
                </label>
                <input
                  type="phone"
                  className={`form-control input`}
                  ref={phoneInputRef}
                  autoComplete="new-password"
                />
                <br />
                {/* Password */}
                <label className="grey-text">
                  Password{" "}
                  <span style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                    {errorMsg && errorMsg.password ? errorMsg.password : ""}
                  </span>
                </label>
                <input
                  type="password"
                  className={`form-control input`}
                  ref={passwordInputRef}
                  autoComplete="new-password"
                />
                <br />

                {/* Repeat password */}
                <label className="grey-text">
                  Repeat Password{" "}
                  <span style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                    {errorMsg && errorMsg.repeatPassword
                      ? errorMsg.repeatPassword
                      : ""}
                  </span>
                </label>
                <input
                  type="password"
                  className={`form-control input`}
                  ref={repeatPasswordInputRef}
                  autoComplete="new-password"
                />
                <br />

                <MDBBtn
                  color="dark"
                  type="submit"
                  className="w-50 py-3"
                  style={{ fontSize: "14px" }}
                >
                  CREATE ACCOUNT
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBCardBody>
    </MDBCard>
  );
};

export default RegForm;
