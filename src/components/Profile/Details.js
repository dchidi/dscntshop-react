import React, { useState, useEffect, useContext } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faAt,
  faCalendarDay,
  faCircleCheck,
  faEdit,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DscntshopContext from "../../store/dscntshop-context";
import UpdateUserInfoModal from "./Modal/UpdateUserInfoModal";
import { VERIFY_ACCOUNT_API } from "../../Endpoints";

const Details = (props) => {
  const ctx = useContext(DscntshopContext);

  const verifyAccFn = () => {
    fetch(VERIFY_ACCOUNT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: ctx.userInfo.email }),
    })
      .then((response) => response.json())
      .then((actualData) => {
        alert(actualData.msg);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <MDBCard style={{ maxWidth: "75rem" }}>
        <MDBCardBody>
          <MDBCardTitle className="d-flex">
            <span>Details</span>
            <UpdateUserInfoModal info={ctx.userInfo} />
          </MDBCardTitle>
          <MDBContainer>
            <MDBRow>
              <MDBCol className="mt-5">
                <div className="mb-3">
                  <FontAwesomeIcon icon={faUser} />{" "}
                  <span style={{ fontSize: "18px", paddingLeft: "15px" }}>
                    {ctx.userInfo.name.toUpperCase()}
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#aaa",
                        marginTop: "-5px",
                        marginLeft: "35px",
                      }}
                    >
                      Name
                    </div>
                  </span>
                </div>
                <div className="mb-3">
                  <FontAwesomeIcon icon={faAt} />{" "}
                  <span style={{ fontSize: "18px", paddingLeft: "15px" }}>
                    {ctx.userInfo.email.toLowerCase()}
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#aaa",
                        marginTop: "-5px",
                        marginLeft: "35px",
                      }}
                    >
                      Email
                    </div>
                  </span>
                </div>
                <div className="mb-3">
                  <FontAwesomeIcon icon={faPhone} />{" "}
                  <span style={{ fontSize: "18px", paddingLeft: "15px" }}>
                    {ctx.userInfo.phone}
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#aaa",
                        marginTop: "-5px",
                        marginLeft: "35px",
                      }}
                    >
                      Phone
                    </div>
                  </span>
                </div>
                <div className="mb-3">
                  <FontAwesomeIcon icon={faCalendarDay} />{" "}
                  <span style={{ fontSize: "18px", paddingLeft: "15px" }}>
                    {new Date(
                      ctx.userInfo.date_created.$date
                    ).toLocaleDateString()}
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#aaa",
                        marginTop: "-5px",
                        marginLeft: "35px",
                      }}
                    >
                      Date Created
                    </div>
                  </span>
                </div>
                <div className="mb-3">
                  <FontAwesomeIcon icon={faAddressCard} />{" "}
                  <span style={{ fontSize: "18px", paddingLeft: "15px" }}>
                    {ctx.userInfo.is_verified ? (
                      <MDBBtn color="success" outline>
                        ACTIVATED &nbsp;
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </MDBBtn>
                    ) : (
                      <MDBBtn color="danger" outline onClick={verifyAccFn}>
                        CLICK TO ACTIVATE ACCOUNT
                      </MDBBtn>
                    )}
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#aaa",
                        marginTop: "0px",
                        marginLeft: "35px",
                      }}
                    >
                      Account Status
                    </div>
                  </span>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
      {/* <ModalPage /> */}
    </>
  );
};

export default Details;
