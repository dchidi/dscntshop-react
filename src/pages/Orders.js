import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarNav,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBBadge,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBagShopping,
  faCircleUser,
  faTags,
  faHome,
  faEuroSign,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DscntshopContext from "../store/dscntshop-context";
import Menu from "../components/Menu/Menu";
import Content from "../components/UI/Content";
import Page from "../components/UI/Page";
import OrderItem from "../components/OrderItem";
import { CREATE_CHECKOUT_SESSION_API, CLEAR_CART_API } from "../Endpoints";

const OrdersPage = () => {
  const ctx = useContext(DscntshopContext);
  const navigate = useNavigate();

  const checkout = () => {
    // Call API endpoint for user registration
    fetch(CREATE_CHECKOUT_SESSION_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartData: ctx.cart, email: ctx.userInfo.email }),
    })
      .then((response) => response.json())
      .then((actualData) => {
        // if status is 200
        if (actualData.status == 200) {
          const ctxData = {
            isLoggedIn: ctx.isLoggedIn,
            isAdmin: ctx.isAdmin,
            isSuperAdmin: ctx.isSuperAdmin,
            isVerified: ctx.isVerified,
            userInfo: ctx.userInfo,
            cart: [],
            filters: ctx.filters,
            filtersValue: ctx.filtersValue,
            search: ctx.search,
            settings: ctx.settings,
          };
          ctx.updateContext(ctxData);

          localStorage.setItem("userinfo", JSON.stringify(ctxData));
          window.open(`${actualData.url}`, "_blank");
          console.log(actualData.url);
        }
        // Catch errors here
        else {
          console.log(actualData.msg);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const clearCart = () => {
    // Call API endpoint for user registration
    if (ctx.userInfo.email) {
      fetch(CLEAR_CART_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: ctx.userInfo.email }),
      })
        .then((response) => response.json())
        .then((actualData) => {
          // if status is 200
          if (actualData.status == 200) {
            navigate("/");
          }
          // Catch errors here
          else {
            console.log(actualData.msg);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    const ctxData = {
      isLoggedIn: ctx.isLoggedIn,
      isAdmin: ctx.isAdmin,
      isSuperAdmin: ctx.isSuperAdmin,
      isVerified: ctx.isVerified,
      userInfo: ctx.userInfo,
      cart: [],
      search: ctx.search,
      filters: ctx.filters,
      filtersValue: ctx.filtersValue,
      settings: ctx.settings,
    };

    localStorage.setItem("userinfo", JSON.stringify(ctxData));

    ctx.updateContext(ctxData);
  };

  return (
    <Page>
      <Menu />
      <div style={{ paddingTop: "6%" }}></div>
      <Content className="p-5">
        <h5 className="pt-5">Cart</h5>
        {ctx.cart.length > 0 || (
          <div>
            <h3
              style={{
                fontSize: "18px",
                textAlign: "center",
                color: "#b11926",
                marginTop: "15%",
              }}
            >
              <FontAwesomeIcon icon={faBagShopping} size="2x" /> &nbsp; NO ITEM
              IN CART
            </h3>
          </div>
        )}
        <div style={{ height: "400px", overflow: "auto" }}>
          {ctx.cart.map((item) => (
            <OrderItem
              key={item.id}
              id={item.id}
              img={item.img}
              name={item.name}
              amount={item.amount}
              qty={item.qty}
            />
          ))}
        </div>

        {ctx.cart.length > 0 && (
          <div className="p-5">
            <h5>Total Items {ctx.cart.length}</h5>
            <h5>
              Total Amount{" "}
              {/* sum is the accumulator, item is the current item, 0 after the arrow function is the initial value */}
              {(
                Math.round(
                  (ctx.cart.reduce((sum, item) => {
                    return sum + parseInt(item.qty) * parseFloat(item.amount);
                  }, 0) +
                    Number.EPSILON) *
                    100
                ) / 100
              ).toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </h5>
            <hr />
            {ctx.isLoggedIn && (
              <>
                <MDBBtn
                  color="dark"
                  outline
                  style={{ fontSize: "15px" }}
                  onClick={checkout}
                  className="me-3"
                >
                  <FontAwesomeIcon
                    icon={faBagShopping}
                    style={{ fontSize: "18px" }}
                  />{" "}
                  &nbsp; CHECKOUT
                </MDBBtn>
                <MDBBtn
                  color="danger"
                  outline
                  style={{ fontSize: "15px" }}
                  onClick={clearCart}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ fontSize: "18px" }}
                  />{" "}
                  &nbsp; CLEAR CART
                </MDBBtn>
              </>
            )}
          </div>
        )}
      </Content>
    </Page>
  );
};

export default OrdersPage;
