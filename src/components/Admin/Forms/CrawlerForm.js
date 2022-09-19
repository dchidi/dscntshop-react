import React, { useState, useRef } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faSpider } from "@fortawesome/free-solid-svg-icons";

// source : https://codesandbox.io/s/4uleh?file=/src/App.js:303-509
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

import style from "./CrawlerForm.modules.css";
import SpinnerWidget from "../../Spinner/SpinnerWidget";
import { ADMIN_SCRAP_WEB_API } from "../../../Endpoints";

const CrawlerForm = () => {
  // Logic for handling multiple engine values

  //   profile values
  const profile_SelectedEngines = "ebay";
  const profile_searchWord = "hp laptop,dell laptop";
  const profile_pagination = "1";

  //   set default to value from profile
  const [selectedEngines, setSelectedEngines] = useState(
    profile_SelectedEngines
  );
  const handleOnchange = (val) => setSelectedEngines(val);

  const searchWordInputRef = useRef();
  const paginationInputRef = useRef();

  const [errorMsg, setErrorMsg] = useState({
    searchItems: "",
    totalPage: "",
    engine: "",
  });

  const [loadingState, setLoadingState] = useState(false);

  const validateTotalPage = (val) => {
    let status = false;
    if (!val) {
      setErrorMsg((prev) => {
        return {
          ...prev,
          totalPage: "Total page count is required",
        };
      });
    } else if (val < 1) {
      setErrorMsg((prev) => {
        return {
          ...prev,
          totalPage: "Only positive numbers allowed",
        };
      });
    } else {
      status = true;
      setErrorMsg((prev) => {
        return {
          ...prev,
          totalPage: "",
        };
      });
    }
    return status;
  };

  const validateSearchItems = (val) => {
    let status = false;
    if (!val) {
      setErrorMsg((prev) => {
        return {
          ...prev,
          searchItems: "Search Items are required",
        };
      });
    } else {
      status = true;
      setErrorMsg((prev) => {
        return {
          ...prev,
          searchItems: "",
        };
      });
    }
    return status;
  };

  const validateEngine = (val) => {
    let status = false;
    if (!val) {
      setErrorMsg((prev) => {
        return {
          ...prev,
          engine: "Engine field is required",
        };
      });
    } else {
      status = true;
      setErrorMsg((prev) => {
        return { ...prev, engine: "" };
      });
    }
    return status;
  };

  const engines = [
    { label: "Amazon Engine", value: "amazon" },
    { label: "Ebay Engine", value: "ebay" },
  ];

  //   Form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    const engineInput = selectedEngines;

    // if useRef has no value, use the values gotten from user profile
    const searchWordInput = searchWordInputRef.current.value;
    const paginationInput = paginationInputRef.current.value;

    const vtotalpage = validateTotalPage(paginationInput);
    const vsearchitems = validateSearchItems(searchWordInput);
    const vengine = validateEngine(engineInput);

    if (vtotalpage && vsearchitems && vengine) {
      const data = {
        engines: engineInput,
        search_word: searchWordInput,
        pagination: paginationInput,
      };

      setLoadingState(true);

      fetch(ADMIN_SCRAP_WEB_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((actualData) => {
          setLoadingState(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoadingState(false);
        });
    }
  };

  const loadingContainer = loadingState ? (
    <div className="d-flex justify-content-right">
      <SpinnerWidget />
    </div>
  ) : (
    ""
  );

  return (
    <MDBCard style={{ maxWidth: "75rem" }}>
      <MDBCardBody>
        <MDBCardTitle>Crawler</MDBCardTitle>
        <MDBContainer>
          <MDBRow>
            <MDBCol className="mt-5">
              {loadingContainer}
              <form onSubmit={submitHandler}>
                {/* ENGINE */}
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Search Engine{" "}
                  <span style={{ fontSize: "12px", color: "#c34e61" }}>
                    {errorMsg.engine}
                  </span>
                </label>
                <MultiSelect
                  defaultValue={selectedEngines}
                  className="multi-select"
                  onChange={handleOnchange}
                  options={engines}
                />{" "}
                <br />
                {/* SEARCH WORD */}
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Search Items{" "}
                  <span style={{ fontSize: "12px", color: "#777" }}>
                    Brand Category (extra_sarch_term OPTIONAL) e.g HP LAPTOP ,
                    APPLE IPAD PRO &nbsp;
                  </span>
                  <br />
                  <span style={{ fontSize: "12px", color: "#c34e61" }}>
                    {errorMsg.searchItems}
                  </span>
                </label>
                <textarea
                  className={`form-control w-50`}
                  rows={5}
                  cols={6}
                  ref={searchWordInputRef}
                />
                <br />
                {/* PAGINATION */}
                <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                  Total Page to Crawl / Search <br />
                  <span style={{ fontSize: "12px", color: "#c34e61" }}>
                    {errorMsg.totalPage}
                  </span>
                </label>
                <input
                  type="number"
                  className={`form-control input w-25`}
                  min={1}
                  max={100}
                  ref={paginationInputRef}
                />
                <br />
                {/* <MDBBtn type="submit" color="light" className="me-3">
                  <FontAwesomeIcon icon={faClockRotateLeft} /> Schedule
                </MDBBtn> */}
                <MDBBtn outline color="dark" type="submit">
                  <FontAwesomeIcon icon={faSpider} /> Crawl
                </MDBBtn>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBCardBody>
    </MDBCard>
  );
};

export default CrawlerForm;
