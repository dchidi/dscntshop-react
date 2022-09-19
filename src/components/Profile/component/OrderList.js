import React, { useState } from "react";
import {
  MDBRow,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faEuroSign,
} from "@fortawesome/free-solid-svg-icons";
import DeleteOrderModal from "../Modal/DeleteOrderModal";

const OrderList = (props) => {
  const [showOrderedItems, setShowOrderedItems] = useState({
    current_state: false,
    display: "none",
  });

  const toggleView = () =>
    setShowOrderedItems((prev) => {
      // if the current state is true, set display to none
      if (prev.current_state)
        return { current_state: !prev.current_state, display: "none" };
      else {
        // fetchDataFnc();
        return { current_state: !prev.current_state, display: "block" };
      }
    });

  let count = 0;

  const data = props.data;
  let dt = new Date(data.date_checkedout.$date);

  return (
    <>
      {/* Item card */}
      <MDBCard className="m-5 py-3 px-5">
        <MDBCardBody>
          <div className="d-flex">
            <div className="flex-fill">
              <MDBRow>
                <h5>
                  <span className="pe-3" style={{ fontSize: "14px" }}>
                    Order ID
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {data.id.slice(0, 8).toUpperCase()}
                  </span>
                </h5>
              </MDBRow>
              <div className="d-flex">
                <div className="me-5">
                  <span className="pe-3" style={{ fontSize: "14px" }}>
                    Purchase Date
                  </span>{" "}
                  <span
                    style={{ fontWeight: "bold" }}
                  >{`${dt.toLocaleDateString()}`}</span>
                </div>
                <div className="me-5">
                  <span className="pe-3" style={{ fontSize: "14px" }}>
                    Total Items
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {data.order_details.length}
                  </span>
                </div>
              </div>
              <div className="d-flex">
                <div className="me-5">
                  <span className="pe-3" style={{ fontSize: "14px" }}>
                    Total Cost
                  </span>{" "}
                  <FontAwesomeIcon icon={faEuroSign} />{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {(
                      Math.round((data.total + Number.EPSILON) * 100) / 100
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div>
                  <span className="pe-3" style={{ fontSize: "14px" }}>
                    Shipment Cost
                  </span>{" "}
                  <FontAwesomeIcon icon={faEuroSign} />{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {(
                      Math.round((data.shipping_cost + Number.EPSILON) * 100) /
                      100
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <MDBBtn
                color="dark"
                outline
                style={{ fontSize: "12px" }}
                onClick={toggleView}
              >
                {showOrderedItems.current_state ? "COLLAPSE VIEW" : "VIEW ITEM"}{" "}
                <FontAwesomeIcon
                  icon={
                    showOrderedItems.current_state ? faCaretUp : faCaretDown
                  }
                />
              </MDBBtn>
              {/* Delete item */}
              <DeleteOrderModal id={data.id} fetchDataFn={props.fetchDataFn} />
            </div>
          </div>
          <br />
          <div className="mt-2" style={{ display: showOrderedItems.display }}>
            <h5>Item List</h5>
            <div>
              <MDBTable hover style={{ width: "100%" }}>
                <MDBTableHead color="primary-color">
                  <tr>
                    <th>#</th>
                    <th style={{ width: "40%" }}>Item</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total Amount</th>
                    {/* <th>Action</th> */}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {data.order_details &&
                    data.order_details.map((item) => {
                      count++;
                      return (
                        <tr>
                          <td>{count}</td>
                          <td>{item.name.toUpperCase()}</td>
                          <td>{item.qty}</td>
                          <td>
                            <FontAwesomeIcon icon={faEuroSign} /> {item.amount}
                          </td>
                          <td>
                            <FontAwesomeIcon icon={faEuroSign} />{" "}
                            {Math.round(
                              (item.qty * item.amount + Number.EPSILON) * 100
                            ) / 100}
                          </td>
                          {/* Implement return here */}
                          {/* <td>
                                      
                                      <ReturnOrderModal
                                        category={item.category}
                                        brand={item.brand}
                                        getDatafn={fetchDataFnc}
                                      />
                                      <DeleteOrderModal
                                        category={item.category}
                                        brand={item.brand}
                                        getDatafn={fetchDataFnc}
                                      />
                                    </td> */}
                        </tr>
                      );
                    })}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
      {/* End of item card */}
    </>
  );
};

export default OrderList;
