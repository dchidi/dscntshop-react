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

// import style from "./Orders.module.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
// import DeleteCategoryModal from "./Modal/DeleteCategoryModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import OrderList from "./component/OrderList";
import DscntshopContext from "../../store/dscntshop-context";
import { ORDER_API } from "../../Endpoints";

const Orders = (props) => {
  const ctx = useContext(DscntshopContext);
  const [getOrders, setOrders] = useState([]);
  const orderUrl = `${ORDER_API}/${ctx.userInfo.email}`;

  const fetchOrders = () => {
    fetch(orderUrl)
      .then((response) => response.json())
      .then((actualData) => {
        setOrders(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(fetchOrders, []);

  return (
    <>
      <MDBCard style={{ maxWidth: "75rem" }}>
        <MDBCardBody>
          <MDBCardTitle>
            Orders
            <div style={{ fontSize: "1px" }}>0 items</div>
          </MDBCardTitle>
          <MDBContainer>
            <MDBRow>
              <MDBCol className="mt-5">
                {/* Item card */}
                {getOrders &&
                  getOrders.map((item) => (
                    <OrderList
                      key={item.id}
                      data={item}
                      fetchDataFn={fetchOrders}
                    />
                  ))}

                {/* End of item card */}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
      {/* <ModalPage /> */}
    </>
  );
};

export default Orders;
