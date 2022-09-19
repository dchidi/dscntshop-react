import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faInfo,
  faEuroSign,
} from "@fortawesome/free-solid-svg-icons";

import style from "./RecentlyAdded.module.css";
import AddToCart from "../AddToCart";
import DscntshopContext from "../../store/dscntshop-context";
import { PRODUCT_GROUPS_API } from "../../Endpoints";

const ProductGroup = (props) => {
  const ctx = useContext(DscntshopContext);
  // currency variable
  const currency = <FontAwesomeIcon icon={faEuroSign} />;

  const [products, setProducts] = useState(null);

  let url = PRODUCT_GROUPS_API;
  if (props.email) url = `${PRODUCT_GROUPS_API}/${props.email}`;

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((actualData) => {
        setProducts(actualData.data);
        if (actualData.userInfo) {
          const userinfo = actualData.userInfo;
          console.log(userinfo);
          const ctxData = {
            isLoggedIn: ctx.isLoggedIn,
            isAdmin: userinfo.is_admin,
            isSuperAdmin: userinfo.is_super_admin,
            isVerified: userinfo.is_verified,
            userInfo: {
              name: userinfo.name,
              email: userinfo.email,
              phone: userinfo.phone,
              id: userinfo.id,
              is_verified: userinfo.is_verified,
              date_created: userinfo.date_created,
              is_admin: userinfo.is_admin,
            },
            cart: [...userinfo.cart],
            search: userinfo.search,
            filters: ctx.filters,
            filtersValue: ctx.filtersValue,
            settings: ctx.settings,
          };

          localStorage.setItem("userinfo", JSON.stringify(ctxData));

          ctx.updateContext(ctxData);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {products &&
        products.map((data, i) => {
          return (
            <div className={`mt-4 p-2 ${style.card}`} key={i}>
              <div className="d-flex pb-4">
                <h5 className={style.title}>
                  {data[0]["category"].toUpperCase()}
                </h5>

                {/* <a href="#" > */}
                <Link
                  to={`/more/${data[0]["category"].toLowerCase()}`}
                  className={`ms-auto ${style.more}`}
                >
                  [more++]
                </Link>
                {/* </a> */}
              </div>
              <div className="d-flex flex-wrap">
                {data.map((product) => {
                  return (
                    <MDBCard
                      style={{
                        maxWidth: "20rem",
                        marginRight: "20px",
                        marginBottom: "20px",
                      }}
                      // TODO:: change name to id
                      key={`${product.id}`}
                    >
                      <MDBCardImage
                        src={product.image}
                        position="top"
                        className="img-thumbnail my-4 mx-3"
                        style={{
                          width: "90%",
                          height: "200px",
                          objectFit: "scale-down",
                          padding: "10px",
                        }}
                      />
                      <MDBCardBody className="text-center">
                        <MDBCardText>
                          <p>{product.name}</p>

                          <div
                            className="d-flex justify-content-center"
                            style={{ fontSize: "25px" }}
                          >
                            <span className={`pe-2 ${style.discount}`}>
                              {product.discount}% off
                            </span>
                            <span className={style.price}>
                              {currency}
                              {product.price.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        </MDBCardText>
                        <MDBCardText className="d-flex justify-content-left">
                          <small className="text-muted">
                            shop {product.shop}
                          </small>
                        </MDBCardText>
                        <hr className={style.thinHr} />
                        {/* ADD TO CART COMPONENT */}
                        <AddToCart
                          product_id={product.id}
                          name={product.name}
                          amount={product.price}
                          img={product.image}
                          qty={1}
                          getDataFn={getData}
                        />

                        <MDBBtn
                          href={product.url}
                          className="m-1"
                          color="dark"
                          outline
                          target="_blank"
                        >
                          <FontAwesomeIcon icon={faInfo} />
                        </MDBBtn>
                      </MDBCardBody>
                    </MDBCard>
                  );
                })}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductGroup;
