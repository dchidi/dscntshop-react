import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faFilter } from "@fortawesome/free-solid-svg-icons";

import style from "./FilterModal.module.css";
import DscntshopContext from "../../store/dscntshop-context";
import { AUTO_LOAD_CAT_API } from "../../Endpoints";

const FilterModal = (props) => {
  // Global context
  const ctx = useContext(DscntshopContext);

  // hook for dynamic url navigation
  const navigate = useNavigate();

  const initFilterData = ctx.filtersValue.conditions || [];

  const fetchCategory = (_val) => {
    fetch(AUTO_LOAD_CAT_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brand: _val }),
    })
      .then((response) => response.json())
      .then((actualData) => {
        setCategories(actualData.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //Hook for filter values
  const [filterConditions, setFilterConditions] = useState(initFilterData);

  // initialize categories
  const [categories, setCategories] = useState(null);

  // brand data
  const [brandVal, setBrandVal] = useState(
    filterConditions.map((x) => x.value)
  );

  // Load category with intial value of brand gotten
  useEffect(() => {
    fetchCategory(brandVal);
  }, []);

  // Manage model display and dismissal
  const [showModal, setShow] = useState(false);
  //   handle close and show on modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Hook for form data
  const [formData, setFormData] = useState({
    minPrice: 0,
    maxPrice: 2000,
    conditions: filterConditions,
  });

  // hook for error message. Mainly for price
  const [errorMsg, setErrorMsg] = useState("");

  // Check if input checkbox is checked by user
  const isBoxChecked = (arg) => {
    const dd = filterConditions.filter((x) => x.value === arg);
    return dd.length > 0 ? true : false;
  };

  //   Handle input change and collect data
  const onChangeHandler = (e) => {
    // get the group
    const group = e.target.defaultValue;
    // check if box ischecked
    const status = e.target.checked;
    // get the value
    const _val = e.target.id;
    // console.log(_val, status, group);

    // if box is checked
    if (status) {
      const ddd = [...filterConditions, { group: group, value: _val }];
      setFilterConditions(ddd);
      // console.log(ddd);

      // Load category based on selected brand
      if (group == "brand") {
        const bbb = [...brandVal, _val];
        setBrandVal(bbb);
        fetchCategory(bbb);
      }
    } else {
      const ddd = filterConditions.filter((x) => x.value !== _val);
      setFilterConditions(ddd);
      // Remove from brand list
      if (group == "brand") {
        const bbb = brandVal.filter((x) => x !== _val);
        setBrandVal(bbb);
        fetchCategory(bbb);
      }
    }
  };
  // submit
  const filterSubmitHandler = () => {
    if (parseInt(formData.minPrice) > parseInt(formData.maxPrice)) {
      setErrorMsg("Invalid price range. Min value > Max value");
    } else {
      // Update global context
      const filterData = {
        minPrice: formData.minPrice,
        maxPrice: formData.maxPrice,
        conditions: filterConditions,
      };

      const ctxData = {
        isLoggedIn: ctx.isLoggedIn,
        isAdmin: ctx.isAdmin,
        isSuperAdmin: ctx.isSuperAdmin,
        isVerified: ctx.isVerified,
        userInfo: ctx.userInfo,
        cart: ctx.cart,
        search: ctx.search,
        filters: ctx.filters,
        filtersValue: filterData,
        settings: ctx.settings,
      };

      localStorage.setItem("userinfo", JSON.stringify(ctxData));

      ctx.updateContext(ctxData);

      // Navigate to url used in loading filter result
      navigate("/filter");
      // close modal
      handleClose();
    }
  };

  //   Manage slider values
  const minRangeHandler = (e) => {
    setFormData((prev) => {
      return { ...prev, minPrice: e.target.value };
    });
  };
  const maxRangeHandler = (e) => {
    setFormData((prev) => {
      return { ...prev, maxPrice: e.target.value };
    });
  };

  return (
    <>
      <span className={props.filterCss} onClick={handleShow}>
        <FontAwesomeIcon icon={faSliders}></FontAwesomeIcon>
      </span>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>Filter</Modal.Header>
        <Modal.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
          <MDBContainer>
            <MDBRow>
              <MDBCol className="mt-1">
                {/* <form onSubmit={filterSubmitHandler}> */}
                {/* Brands */}
                <label>Brands</label>
                <div className="pt-2">
                  {props.filters.brand &&
                    props.filters.brand.map((item) => {
                      return (
                        <div
                          className="custom-control custom-checkbox"
                          key={item}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={item}
                            defaultValue="brand"
                            onChange={onChangeHandler}
                            defaultChecked={isBoxChecked(item)}
                          />
                          <label
                            className="custom-control-label ps-2"
                            for={item}
                          >
                            {item.toUpperCase()}
                          </label>
                        </div>
                      );
                    })}
                </div>
                <hr />
                {/* Category */}
                <label>Category</label>
                <div className="pt-2">
                  {categories &&
                    categories.map((item) => {
                      return (
                        <div
                          className="custom-control custom-checkbox"
                          key={item}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={item}
                            defaultValue="category"
                            onChange={onChangeHandler}
                            defaultChecked={isBoxChecked(item)}
                          />
                          <label
                            className="custom-control-label ps-2"
                            for={item}
                          >
                            {item.toUpperCase()}
                          </label>
                        </div>
                      );
                    })}
                </div>
                <hr />
                {/* Price */}
                <label>
                  Price{" "}
                  <span style={{ fontSize: "12px", color: "rgb(161, 64, 64)" }}>
                    {errorMsg || ""}
                  </span>
                </label>
                <div className="pt-2">
                  <div className={style.slidecontainer}>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      defaultValue={formData.minPrice}
                      className={style.slider}
                      onChange={minRangeHandler}
                    />
                    <p style={{ fontSize: "13px" }}>
                      Min range: {formData.minPrice}
                    </p>
                  </div>
                  <div className={style.slidecontainer}>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      defaultValue={formData.maxPrice}
                      className={style.slider}
                      onChange={maxRangeHandler}
                    />
                    <p style={{ fontSize: "13px" }}>
                      Max range: {formData.maxPrice}
                    </p>
                  </div>
                </div>
                <hr />
                <br />
                <MDBBtn
                  color="dark"
                  // type="submit"
                  onClick={filterSubmitHandler}
                  outline
                  style={{ fontSize: "12px" }}
                >
                  <FontAwesomeIcon icon={faFilter} /> APPLY FILTER
                </MDBBtn>
                {/* </form> */}
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilterModal;
