import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn, MDBCardImage } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEuroSign,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DscntshopContext from "../store/dscntshop-context";

const OrderItem = (props) => {
  const ctx = useContext(DscntshopContext);

  const updateContextData = (newData) => {
    const ctxData = {
      isLoggedIn: ctx.isLoggedIn,
      isAdmin: ctx.isAdmin,
      isSuperAdmin: ctx.isSuperAdmin,
      isVerified: ctx.isVerified,
      userInfo: ctx.userInfo,
      cart: [...newData],
      search: ctx.search,
      filters: ctx.filters,
      filtersValue: ctx.filtersValue,
      settings: ctx.settings,
    };

    localStorage.setItem("userinfo", JSON.stringify(ctxData));

    ctx.updateContext(ctxData);
  };

  const [totalItemAmount, settotalItemAmount] = useState(
    parseInt(props.qty) * parseFloat(props.amount)
  );
  const [qty, setQty] = useState(parseInt(props.qty));

  const increase = () => {
    setQty((prev) => {
      const newQty = parseInt(qty) + 1;
      //   Update item total
      settotalItemAmount((prev) => {
        return newQty * parseFloat(props.amount);
      });
      //   Update global context
      const newData = ctx.cart.filter((item) => {
        if (item.id !== props.id) return item;
        else {
          item.qty = newQty;
          return item;
        }
      });

      updateContextData(newData);
      // return new quatity
      return newQty;
    });
  };

  const decrease = () => {
    setQty((prev) => {
      const newQty = parseInt(qty) - 1;
      if (newQty > 0) {
        settotalItemAmount((prev) => {
          return newQty * parseFloat(props.amount);
        });
        //   Update global context
        const newData = ctx.cart.filter((item) => {
          if (item.id !== props.id) return item;
          else {
            item.qty = newQty;
            return item;
          }
        });

        updateContextData(newData);
        // Return new qty
        return newQty;
      }
      return qty;
    });
  };

  const deleteItem = () => {
    const newData = ctx.cart.filter((item) => {
      if (item.id !== props.id) return item;
    });
    updateContextData(newData);
  };

  return (
    <div className="card w-75 px-5" style={{ marginLeft: "10%" }}>
      <div className="d-flex">
        {/* image */}
        {/* <div className="p-3">
          <img src={`${props.img}`} style={{ width: "6em" }} />
        </div> */}
        <MDBCardImage
          src={props.img}
          fluid
          // style={{ height: "100%" }}
          className="img-thumbnail py-4 px-3 me-5"
          style={{
            //   width: "90%",
            height: "150px",
            objectFit: "scale-down",
            padding: "10px",
          }}
        />
        {/* info */}
        <div className="">
          <div className="w-75">{props.name}</div>
          <div
            style={{
              marginTop: "15px",
              color: "#888",
              fontSize: "13px",
            }}
          >
            <FontAwesomeIcon icon={faEuroSign} />
            <span
              style={{
                paddingLeft: "2px",
                marginTop: "-4px",
                fontSize: "14px",
              }}
            >
              {Math.round((props.amount + Number.EPSILON) * 100) / 100} unit
              price
            </span>
          </div>
          <div
            className="d-flex"
            style={{ fontSize: "18px", marginTop: "10px" }}
          >
            <MDBBtn
              outline
              color="dark"
              className="py-1 px-3"
              onClick={decrease}
            >
              <FontAwesomeIcon icon={faMinus} />
            </MDBBtn>
            {/* Quantity */}
            <span className="px-3">{qty}</span>
            <MDBBtn
              outline
              color="dark"
              className="py-1 px-3"
              onClick={increase}
            >
              <FontAwesomeIcon icon={faPlus} />
            </MDBBtn>
          </div>
        </div>
        {/* price and action */}
        <div style={{ marginTop: "20px" }}>
          <div className="d-flex justify-content-center">
            <FontAwesomeIcon icon={faEuroSign} />
            <span
              style={{
                paddingLeft: "2px",
                marginTop: "-4px",
                fontSize: "18px",
              }}
            >
              {/* Total amount */}
              {(
                Math.round((totalItemAmount + Number.EPSILON) * 100) / 100
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="mt-4">
            {/* Delete item */}
            <MDBBtn
              color="danger"
              outline
              className="py-2 px-3"
              onClick={deleteItem}
            >
              <div className="d-flex">
                <FontAwesomeIcon icon={faTrash} style={{ marginTop: "3px" }} />
                <div className="ps-2">DELETE</div>
              </div>
            </MDBBtn>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default OrderItem;
