import React, { useState, useRef } from "react";
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
import { ADMIN_UPDATE_CATEGORY_API } from "../../../Endpoints";

import style from "./CrawlerForm.modules.css";

const EditCategoryForm = (props) => {
  const categoryInputRef = useRef();
  const brandInputRef = useRef();
  const oldcategoryInputRef = useRef();

  //   Form submit handler
  const updateCategoryHandler = (e) => {
    e.preventDefault();

    const categoryInput = categoryInputRef.current.value;
    const brandInput = brandInputRef.current.value;
    const oldcategoryInput = oldcategoryInputRef.current.value;

    const data = {
      category: categoryInput,
      brand: brandInput,
      oldcategory: oldcategoryInput,
    };

    fetch(ADMIN_UPDATE_CATEGORY_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status == 200) {
        props.getDatafn();
        props.closeModalfn();
      }
    });
  };

  return (
    <MDBCard style={{ maxWidth: "75rem" }}>
      <MDBCardBody>
        <MDBContainer>
          <MDBRow>
            <MDBCol className="mt-1">
              <form onSubmit={updateCategoryHandler}>
                {/* Category */}
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Category
                </label>
                {/* using defaultValue to allow users the ability to change the value */}
                <input
                  type="text"
                  className={`form-control input`}
                  defaultValue={props.category}
                  ref={categoryInputRef}
                />
                <br />
                {/* Brand */}
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Brand{" "}
                  <span style={{ fontSize: "12px", color: "#c34e61" }}>
                    cannot be edited
                  </span>
                </label>
                {/* using value here so that user cannot change it */}
                <input
                  type="text"
                  className={`form-control input`}
                  value={props.brand}
                  ref={brandInputRef}
                />
                <input
                  type="hidden"
                  value={props.category}
                  ref={oldcategoryInputRef}
                />
                <br />
                <MDBBtn outline color="dark" type="submit">
                  <FontAwesomeIcon icon={faFloppyDisk} /> Update
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBCardBody>
    </MDBCard>
  );
};

export default EditCategoryForm;
