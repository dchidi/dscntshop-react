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
  faShoppingCart,
  faInfo,
  faEuroSign,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

import style from "./RecentlyAdded.module.css";
import AddToCart from "../AddToCart";
import { DISCOUNT_GROUP_API } from "../../Endpoints";

const MoreItems = (props) => {
  // currency variable
  const currency = <FontAwesomeIcon icon={faEuroSign} />;

  var sub_product_array;
  const page_size = 24;

  const [showbtn, setShowbtn] = useState({
    prvbtn: "none",
    nxtbtn: "inline-block",
  });

  const [products, setProducts] = useState(null);
  const [pagination, setPagination] = useState({ start: 0, end: page_size });
  // var url = `http://127.0.0.1:5001/discount_group/${props.upper_bound}/${props.lower_bound}`;
  const url = `${DISCOUNT_GROUP_API}/${props.upper_bound}/${props.lower_bound}`;

  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((actualData) => setProducts(actualData.data))
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
      return { prvbtn: "inline-block", nxtbtn: prev.nxtbtn };
    });
    // use prev to ensure that the latest state is used
    setPagination((prev) => {
      if (products.length >= prev.end + page_size) {
        return {
          start: prev.end,
          end: prev.end + page_size,
        };
      } else {
        // No data to load from products. TODO: Disable next button
        setShowbtn((prev) => {
          return { prvbtn: "inline-block", nxtbtn: "none" };
        });
        return {
          start: prev.end,
          end: products.length,
        };
      }
    });
    scroll();
  };

  // PREVIOUS PAGE
  const prevPage = () => {
    setShowbtn((prev) => {
      return { prvbtn: prev.prvbtn, nxtbtn: "inline-block" };
    });
    // use prev to ensure that the latest state is used
    setPagination((prev) => {
      if (prev.start - page_size >= 0) {
        return {
          start: prev.start - page_size,
          end: prev.start,
        };
      } else {
        // No data to load from products. TODO: Disable previous button
        setShowbtn({ prvbtn: "none", nxtbtn: "inline-block" });
        return {
          start: 0,
          end: page_size,
        };
      }
    });
    scroll();
  };

  if (products && pagination) {
    sub_product_array = products.slice(pagination.start, pagination.end);
  }

  return (
    <div style={{ paddingTop: "30px" }}>
      <div className={`mt-4 p-2 ${style.card}`}>
        <div className="d-flex pb-4">
          <h5 className={style.title}>
            Showing items with discount between {props.lower_bound}% and{" "}
            {props.upper_bound}%
            <span className={style.found}>
              {" "}
              [{products && products.length} items found]
            </span>
          </h5>
        </div>
        <div className="d-flex flex-wrap">
          {sub_product_array &&
            sub_product_array.map((product) => {
              return (
                <MDBCard
                  style={{
                    maxWidth: "20rem",
                    marginRight: "20px",
                    marginBottom: "20px",
                  }}
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
                    // TODO:: change name to id
                    key={`${product.id}`}
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
