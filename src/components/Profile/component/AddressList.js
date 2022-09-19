import React from "react";
import { MDBRow, MDBBtn, MDBCard, MDBCardBody } from "mdb-react-ui-kit";

const AddressList = () => {
  return (
    <MDBCard className="m-5 py-3 px-5">
      <MDBCardBody>
        <div className="d-flex">
          <div className="flex-fill">
            <MDBRow>
              <h5>Default Address</h5>
            </MDBRow>
            <div className="d-flex">
              <div className="me-5">
                38 Hillcrest Drive, Lucan, D04589, Dublin, Ireland
              </div>
            </div>
          </div>
          <div>
            <MDBBtn color="danger" outline style={{ fontSize: "12px" }}>
              DELETE
            </MDBBtn>
          </div>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default AddressList;
