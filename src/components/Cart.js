import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBNavbarItem, MDBNavbarLink, MDBBadge } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import style from "./Menu/Menu.module.css";
import DscntshopContext from "../store/dscntshop-context";

const Cart = (props) => {
  const ctx = useContext(DscntshopContext);
  return (
    <>
      <Link to="/orders">
        <MDBNavbarItem>
          <MDBNavbarLink aria-current="page" href="#">
            <FontAwesomeIcon className={style.user} icon={faBagShopping} />
            &nbsp;
            <MDBBadge className={` ${style.badge}`} color="pink">
              {ctx.cart ? ctx.cart.length : 0}
            </MDBBadge>
          </MDBNavbarLink>
        </MDBNavbarItem>
      </Link>
    </>
  );
};

export default Cart;
