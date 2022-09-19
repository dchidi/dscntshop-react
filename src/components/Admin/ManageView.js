import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  // MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import EditCategoryModal from "./Modal/EditCategoryModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteCategoryModal from "./Modal/DeleteCategoryModal";
import { ADMIN_BRAND_CAT_API } from "../../Endpoints";

const ManageView = (props) => {
  const [items, setItems] = useState(null);

  var count = 0;

  const fetchDataFnc = () => {
    fetch(ADMIN_BRAND_CAT_API)
      .then((response) => response.json())
      .then((actualData) => setItems(actualData.data))
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(fetchDataFnc, [ADMIN_BRAND_CAT_API]);

  return (
    <>
      <MDBCard style={{ maxWidth: "75rem" }}>
        <MDBCardBody>
          <MDBCardTitle>Manage View</MDBCardTitle>
          <MDBContainer>
            <MDBRow>
              <MDBCol className="mt-5">
                <MDBTable hover>
                  <MDBTableHead color="primary-color">
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Total Items</th>
                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {items &&
                      items.map((item) => {
                        count++;
                        return (
                          <tr>
                            <td>{count}</td>
                            <td>{item.category.toUpperCase()}</td>
                            <td>{item.brand.toUpperCase()}</td>
                            <td>{item.total}</td>
                            <td>
                              {/* <MDBBtn color="dark">Disable</MDBBtn> */}
                              {/* <MDBBtn color="dark">Enable</MDBBtn> */}
                              <EditCategoryModal
                                category={item.category}
                                brand={item.brand}
                                getDatafn={fetchDataFnc}
                              />
                              <DeleteCategoryModal
                                category={item.category}
                                brand={item.brand}
                                getDatafn={fetchDataFnc}
                              />
                              {/* <MDBBtn outline color="dark" className="me-2">
                                <FontAwesomeIcon icon={faPencil} />
                              </MDBBtn> */}
                              {/* <MDBBtn outline color="danger">
                                <FontAwesomeIcon icon={faTrash} />
                              </MDBBtn> */}
                            </td>
                          </tr>
                        );
                      })}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
      {/* <ModalPage /> */}
    </>
  );
};

export default ManageView;
