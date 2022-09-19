import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faEuroSign } from "@fortawesome/free-solid-svg-icons";

import style from "./RecentlyAdded.module.css";
import AddToCart from "../AddToCart";
import { BEST_DEAL_API } from "../../Endpoints";

const BestDeals = (props) => {
  // currency variable
  const currency = <FontAwesomeIcon icon={faEuroSign} />;

  const [products, setProducts] = useState(null);
  const getData = () => {
    fetch(BEST_DEAL_API)
      .then((response) => response.json())
      .then((actualData) => setProducts(actualData.data))
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={`p-2 ${style.card}`}>
        <div className="d-flex pb-4">
          <h5 className={style.title}>Best Deals</h5>
        </div>
        <div className={`d-flex ${style.scroll}`}>
          <div className={`${style.scroll2}`}>
            {products &&
              products.map((product) => {
                return (
                  <MDBCard
                    style={{
                      maxWidth: "40em",
                      marginRight: "20px",
                      marginBottom: "20px",
                      whiteSpace: "normal",
                      wordBreak: "break-all",
                      display: "inline-block",
                      backgroundColor: "#fde6e5",
                    }}
                    // TODO:: Change name to id
                    key={`${product.id}`}
                  >
                    <MDBRow className="g-0">
                      <MDBCol md="4">
                        <MDBCardImage
                          src={product.image}
                          fluid
                          // style={{ height: "100%" }}
                          className="img-thumbnail rounded-circle my-4 mx-3"
                          style={{
                            width: "90%",
                            height: "200px",
                            objectFit: "scale-down",
                            padding: "10px",
                          }}
                        />
                      </MDBCol>
                      <MDBCol md="8">
                        <MDBCardBody>
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
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestDeals;
