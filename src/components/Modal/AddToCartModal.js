import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  // MDBContainer,
  // MDBRow,
  // MDBCol,
  MDBBtn,
  MDBCardImage,
  // MDBCard,
  // MDBCardBody,
  // MDBCardTitle,
  // MDBTable,
  // MDBTableBody,
  // MDBTableHead,
} from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCheckDouble,
  faEuroSign,
  faMinus,
  faPlus,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DscntshopContext from "../../store/dscntshop-context";

// import EditCategoryForm from "../Forms/EditCategoryForm";

const AddToCartModal = (props) => {
  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ctx = useContext(DscntshopContext);

  const d = props.data;

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
    parseInt(d.qty) * parseFloat(d.amount)
  );
  const [qty, setQty] = useState(parseInt(d.qty));

  const increase = () => {
    setQty((prev) => {
      const newQty = parseInt(qty) + 1;
      //   Update item total
      settotalItemAmount((prev) => {
        return newQty * parseFloat(d.amount);
      });
      //   Update global context
      const newData = ctx.cart.filter((item) => {
        if (item.id !== d.id) return item;
        else {
          item.qty = newQty;
          return item;
        }
      });

      //   updateContextData(newData);
      // return new quatity
      return newQty;
    });
  };

  const decrease = () => {
    setQty((prev) => {
      const newQty = parseInt(qty) - 1;
      if (newQty > 0) {
        settotalItemAmount((prev) => {
          return newQty * parseFloat(d.amount);
        });
        //   Update global context
        const newData = ctx.cart.filter((item) => {
          if (item.id !== d.id) return item;
          else {
            item.qty = newQty;
            return item;
          }
        });

        // updateContextData(newData);
        // Return new qty
        return newQty;
      }
      return qty;
    });
  };

  //   function to update the global context when add to cart is clicked
  const updateCart = () => {
    // get current value of cart
    const _cart = [...ctx.cart];

    // get product id from component props
    const id = d.product_id;

    // check if product does not exist in cart before adding it
    if (!_cart.filter((item) => item.id === id).length > 0) {
      // if (!_cart.includes(id)) {
      // add new product id to list
      _cart.push({
        id: id,
        name: d.name,
        amount: d.amount,
        qty: qty,
        img: d.img,
      });

      // update global context values
      const ctxData = {
        isLoggedIn: ctx.isLoggedIn,
        isAdmin: ctx.isAdmin,
        isSuperAdmin: ctx.isSuperAdmin,
        isVerified: ctx.isVerified,
        userInfo: ctx.userInfo,
        cart: _cart,
        search: ctx.search,
        filters: ctx.filters,
        filtersValue: ctx.filtersValue,
        settings: ctx.settings,
      };

      //   update local storage to persist data when browser is refreshed
      localStorage.setItem("userinfo", JSON.stringify(ctxData));

      //   call update context function that will trigger context update
      ctx.updateContext(ctxData);
    }
    handleClose();
  };

  return (
    <>
      <MDBBtn className="m-1" color="dark" onClick={handleShow}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </MDBBtn>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          <div className="card px-5">
            <div>
              {/* price and action */}
              {/* <div style={{ marginTop: "20px" }}> */}
              <div className="d-flex justify-content-right mt-5">
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
              {/* </div> */}
            </div>
            <div className="d-flex justify-content-center">
              {/* image */}

              <MDBCardImage
                src={d.img}
                fluid
                // style={{ height: "100%" }}
                className="img-thumbnail py-4 px-3"
                style={{
                  //   width: "90%",
                  height: "200px",
                  objectFit: "scale-down",
                  padding: "10px",
                }}
              />
            </div>
            <div className="d-flex py-4">
              {/* info */}
              <div className="">
                <div>{d.name}</div>
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
                    {Math.round((d.amount + Number.EPSILON) * 100) / 100} unit
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
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <MDBBtn
              outline
              color="defaultd"
              onClick={handleClose}
              className="me-2"
            >
              <FontAwesomeIcon icon={faCancel} /> CANCEL
            </MDBBtn>
            <MDBBtn color="dark" onClick={updateCart}>
              <FontAwesomeIcon icon={faShoppingCart} /> ADD TO CART
            </MDBBtn>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddToCartModal;
