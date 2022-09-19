import React, { useState, useEffect, useContext } from "react";
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
import UpdateAccessModal from "./Modal/UpdateAccessModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteUserModal from "./Modal/DeleteUserModal";
import DscntshopContext from "../../store/dscntshop-context";
import { ADMIN_USER_LIST_API } from "../../Endpoints";

const UserAccess = (props) => {
  const ctx = useContext(DscntshopContext);
  const [items, setItems] = useState(null);

  var count = 0;

  const fetchDataFnc = () => {
    fetch(ADMIN_USER_LIST_API)
      .then((response) => response.json())
      .then((actualData) => setItems(actualData.data))
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(fetchDataFnc, [ADMIN_USER_LIST_API]);

  return (
    <>
      <MDBCard style={{ maxWidth: "75rem" }}>
        <MDBCardBody>
          <MDBCardTitle>Access Control</MDBCardTitle>
          <MDBContainer>
            <MDBRow>
              <MDBCol className="mt-5">
                <MDBTable hover>
                  <MDBTableHead color="primary-color">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Privilege</th>
                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {items &&
                      items.map((item) => {
                        const actionContainer = !item.is_super_admin ? (
                          <td>
                            <UpdateAccessModal
                              email={item.email}
                              name={item.name}
                              is_admin={item.is_admin}
                              getDatafn={fetchDataFnc}
                            />
                            <DeleteUserModal
                              email={item.email}
                              name={item.name}
                              getDatafn={fetchDataFnc}
                            />
                          </td>
                        ) : (
                          <td>
                            <MDBBtn color="dark" outline>
                              UPDATE NOT ALLOWED FOR THIS ACCOUNT
                            </MDBBtn>
                          </td>
                        );
                        count++;
                        return (
                          <tr>
                            <td>{count}</td>
                            <td>{item.name.toUpperCase()}</td>
                            <td>{item.email}</td>
                            <td>
                              {item.is_admin
                                ? item.is_super_admin
                                  ? "Super Admin"
                                  : "Admin"
                                : "User"}
                            </td>
                            {ctx.isSuperAdmin ? (
                              actionContainer
                            ) : (
                              <td>
                                <MDBBtn color="dark" outline>
                                  FOR SUPER ADMIN ONLY
                                </MDBBtn>
                              </td>
                            )}
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

export default UserAccess;
