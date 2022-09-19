import React, { useState, useRef, useContext } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFloppyDisk, faLock } from "@fortawesome/free-solid-svg-icons";

// import style from "./RegForm.modules.css";
import { Link } from "react-router-dom";
import DscntshopContext from "../../store/dscntshop-context";
import { LOGIN_API } from "../../Endpoints";
// import CuteAlert from "../CuteAlert";

const RegForm = (props) => {
  const ctx = useContext(DscntshopContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [errorMsg, setErrorMsg] = useState("");

  //   Form submit handler
  const loginHandler = (e) => {
    e.preventDefault();

    const emailInput = emailInputRef.current.value;
    const passwordInput = passwordInputRef.current.value;

    const data = {
      _email: emailInput,
      _password: passwordInput,
    };

    fetch(LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((actualData) => {
        // if status is 200

        if (actualData.status === 200) {
          const userRecords = actualData.data;
          const _cart = [...ctx.cart, ...userRecords.cart];

          // console.log(userRecords.is_super_admin);

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

          alert("User logged in");
          // <CuteAlert />;

          props.closeModalfn();
        }

        // Catch errors here
        else {
          setErrorMsg(actualData.msg);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <MDBCard style={{ maxWidth: "75rem" }}>
      <MDBCardBody>
        <MDBContainer>
          <MDBRow>
            <MDBCol className="mt-1">
              <form onSubmit={loginHandler}>
                <div style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                  {errorMsg && errorMsg ? errorMsg : ""}
                </div>
                {/* email */}
                <label className="grey-text">Email</label>
                <input
                  type="email"
                  className={`form-control input`}
                  placeholder="Email Address"
                  ref={emailInputRef}
                />
                <br />
                {/* Password */}
                <label className="grey-text">Password</label>
                <input
                  type="password"
                  className={`form-control input`}
                  placeholder="Password"
                  ref={passwordInputRef}
                />
                <br />

                <MDBBtn
                  color="dark"
                  type="submit"
                  className="w-50 py-3"
                  style={{ fontSize: "14px" }}
                >
                  LOGIN
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="px-2 py-3 text-center">
          <hr />
          <div>
            <Link
              to="#"
              style={{ color: "#4f6486" }}
              onClick={props.showformfn}
            >
              Don't have an account?{" "}
              <span style={{ color: "#d69333" }}>Register</span>
            </Link>
          </div>
          <div className="pt-1">
            <Link
              to="#"
              style={{ color: "#4f6486" }}
              onClick={props.retrievepwdfn}
            >
              Forgot password?{" "}
              <span style={{ color: "#d69333" }}>Click here</span>
            </Link>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default RegForm;
