import React, { useContext } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import DscntshopContext from "../store/dscntshop-context";
import DeleteProductModal from "./Modal/DeleteProductModal";
import AddToCartModal from "./Modal/AddToCartModal";

const AddToCart = (props) => {
  // create a reference to the global context
  const ctx = useContext(DscntshopContext);

  //   function to update the global context when add to cart is clicked
  const updateCart = () => {
    // get current value of cart
    const _cart = [...ctx.cart];

    // get product id from component props
    const id = props.product_id;

    // check if product does not exist in cart before adding it
    if (!_cart.filter((item) => item.id === id).length > 0) {
      // if (!_cart.includes(id)) {
      // add new product id to list
      _cart.push({
        id: id,
        name: props.name,
        amount: props.amount,
        qty: props.qty,
        img: props.img,
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
  };

  return (
    <>
      {/* <MDBBtn className="m-1" color="dark" onClick={updateCart}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </MDBBtn> */}
      <AddToCartModal data={props} />
      {ctx.isAdmin && (
        // <MDBBtn className="m-1" color="danger" onClick={deleteItem}>
        //   <FontAwesomeIcon icon={faTrash} />
        // </MDBBtn>
        <DeleteProductModal
          getDataFn={props.getDataFn}
          product_id={props.product_id}
        />
      )}
    </>
  );
};

export default AddToCart;
