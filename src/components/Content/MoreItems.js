import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faEuroSign,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

import style from "./RecentlyAdded.module.css";
import AddToCart from "../AddToCart";
import { MORE_PRODUCTS_API } from "../../Endpoints";

const MoreItems = (props) => {
  // currency variable
  const currency = <FontAwesomeIcon icon={faEuroSign} />;
  const page_size = 24;

  const [showbtn, setShowbtn] = useState({
    prvbtn: "none",
    nxtbtn: "inline-block",
  });

  const [products, setProducts] = useState(0);
  const [pagination, setPagination] = useState({
    start: 0,
    end: page_size,
    pages: 1,
  });

  const url = `${MORE_PRODUCTS_API}/${props.category}/${pagination.start}/${pagination.end}`;

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((actualData) => {
        // manage pagination when product endpoint returns empty list
        if (actualData.data.length === 0) {
          setShowbtn({ prvbtn: "inline-block", nxtbtn: "none" });
          setPagination((prev) => {
            return {
              start: prev.end - page_size * 2,
              end: prev.end - page_size,
              pages: prev.pages - 1,
            };
          });
        } else if (actualData.data.length < page_size) {
          if (pagination.pages > 1)
            setShowbtn({ prvbtn: "inline-block", nxtbtn: "none" });
          else setShowbtn({ prvbtn: "none", nxtbtn: "none" });
        }
        // update product state
        setProducts(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, [url]);

  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // PAGINATION

  // NEXT PAGE
  const nextPage = () => {
    setShowbtn((prev) => {
      return { ...prev, prvbtn: "inline-block" };
    });
    // use prev to ensure that the latest state is used
    setPagination((prev) => {
      if (products.length == page_size) {
        return {
          start: prev.end,
          end: prev.end + page_size,
          pages: prev.pages + 1,
        };
      } else {
        return {
          start: 0,
          end: products.length,
          pages: 1,
        };
      }
    });
    scroll();
  };

  // PREVIOUS PAGE
  const prevPage = () => {
    setShowbtn((prev) => {
      return { ...prev, nxtbtn: "inline-block" };
    });
    // use prev to ensure that the latest state is used
    setPagination((prev) => {
      if (prev.start - page_size >= 0) {
        if (prev.start - page_size === 0) {
          setShowbtn({ prvbtn: "none", nxtbtn: "inline-block" });
        }
        return {
          start: prev.start - page_size,
          end: prev.end - products.length,
          pages: prev.pages - 1,
        };
      } else {
        setShowbtn({ prvbtn: "none", nxtbtn: "inline-block" });
        return {
          start: 0,
          end: page_size,
          pages: 1,
        };
      }
    });

    scroll();
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      <div className={`mt-4 p-2 ${style.card}`}>
        <div className="d-flex pb-4">
          <h5 className={style.title}>
            {props.category.toUpperCase()}
            <span className={style.found}>
              {" "}
              {/* [start {pagination.start} end {pagination.end} totalproduct{" "}
              {products.length}] */}
            </span>
          </h5>
        </div>
        <div className="d-flex flex-wrap">
          {products &&
            products.map((product) => {
              return (
                <MDBCard
                  style={{
                    maxWidth: "20rem",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
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
                      <small className="text-muted">shop {product.shop}</small>
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
        <dvi className="d-flex flex-row-reverse">
          <MDBBtn
            color="warning"
            onClick={nextPage}
            style={{ display: `${showbtn && showbtn.nxtbtn}` }}
          >
            Next <FontAwesomeIcon icon={faArrowRightLong} />
          </MDBBtn>
          <MDBBtn
            outline
            color="warning"
            className={`me-2`}
            onClick={prevPage}
            style={{ display: `${showbtn && showbtn.prvbtn}` }}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} /> Previous
          </MDBBtn>
        </dvi>
      </div>
    </div>
  );
};

export default MoreItems;
