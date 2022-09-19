import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  // MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from "mdb-react-ui-kit";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddressList from "./component/AddressList";

const Address = (props) => {
  const [items, setItems] = useState(null);

  return (
    <>
      <MDBCard style={{ maxWidth: "75rem" }}>
        <MDBCardBody>
          <MDBCardTitle>Address</MDBCardTitle>
          <MDBContainer>
            <MDBRow>
              <MDBCol className="mt-5">
                {/* List of address */}
                <AddressList key={1} />
                <AddressList key={2} />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
      {/* <ModalPage /> */}
    </>
  );
};

export default Address;
