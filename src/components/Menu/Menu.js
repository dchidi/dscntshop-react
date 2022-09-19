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
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBagShopping,
  faCircleUser,
  faTags,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

import style from "./Menu.module.css";
import DscntshopContext from "../../store/dscntshop-context";
import RegLoginModal from "../Modal/RegLoginModal";
import Cart from "../Cart";
import { LOGOUT_API } from "../../Endpoints";

const Menu = () => {
  const ctx = useContext(DscntshopContext);
  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
  const navigate = useNavigate();

  // SAVE DATA
  const save_data = (d) => {
    // Call API endpoint for user registration
    fetch(LOGOUT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(d),
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Logout Handler
  const logout = () => {
    save_data({
      email: ctx.userInfo.email,
      cart: [...ctx.cart],
      filters: ctx.filters,
      search: ctx.search,
      settings: ctx.settings,
    });

    localStorage.clear();
    ctx.updateContext({
      isLoggedIn: false,
      isAdmin: false,
      isSuperAdmin: false,
      isVerified: false,
      userInfo: {},
      cart: [],
      filters: ctx.filters,
      filtersValue: [],
      search: [],
      settings: [],
    });
    navigate("/");
  };

  // is user is not logged in, render login button
  const userActionContainer = ctx.isLoggedIn ? (
    <MDBNavbarItem className="ms-md-2 me-3">
      <MDBNavbarLink aria-current="page" href="#">
        <MDBDropdown className="ms-0">
          <MDBDropdownToggle tag="a" style={{ color: "#000" }}>
            <FontAwesomeIcon
              icon={faCircleUser}
              className={style.user}
            ></FontAwesomeIcon>
          </MDBDropdownToggle>
          <MDBDropdownMenu style={{ marginTop: "25px" }}>
            <MDBDropdownItem>
              {/* Link to acts as anchor to the new page */}
              {ctx.isAdmin ? (
                // <Link to="/admin/crawler">
                <MDBDropdownLink href="/admin/crawler">Admin</MDBDropdownLink>
              ) : (
                // </Link>
                // <Link to="#"></Link>
                <MDBDropdownLink></MDBDropdownLink>
              )}
            </MDBDropdownItem>
            <MDBDropdownItem>
              {/* <Link to="/profile/details"> */}
              <MDBDropdownLink href="/profile/details">Profile</MDBDropdownLink>
              {/* </Link> */}
            </MDBDropdownItem>
            <MDBDropdownItem>
              <MDBDropdownLink onClick={logout}>Logout</MDBDropdownLink>
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavbarLink>
    </MDBNavbarItem>
  ) : (
    // <MDBNavbarItem className="ms-md-5 me-3">
    //   <MDBNavbarLink href="">Login</MDBNavbarLink>
    // </MDBNavbarItem>
    <RegLoginModal />
  );

  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <MDBNavbar
        expand="lg"
        light
        bgColor="light"
        fixed="top"
        className={`${style.menu}`}
      >
        <MDBContainer fluid>
          <Link to="/" onClick={scroll}>
            <MDBNavbarBrand href="#" className={`ms-5 ${style.logo}`}>
              <FontAwesomeIcon
                icon={faHome}
                style={{ marginTop: "-5px", paddingRight: "5px" }}
              />
              &nbsp;Dscnt
              <span className={style.innerLogo}>Shop</span>
            </MDBNavbarBrand>
          </Link>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <FontAwesomeIcon icon={faBars} />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond}>
            <MDBNavbarNav className="ml-auto mb-2 mb-lg-0 d-flex justify-content-end">
              {/* Login username display */}
              <MDBNavbarItem className="ms-3">
                <MDBNavbarLink>
                  {ctx.userInfo.email ? ctx.userInfo.email : ""}
                </MDBNavbarLink>
              </MDBNavbarItem>
              {/* User UI*/}
              {userActionContainer}
              {/* Cart component UI */}
              <Cart />
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <div style={{ marginBottom: "50px" }}></div>
    </>
  );
};

export default Menu;
