import React, { useState } from "react";
import { Link } from "react-router-dom";
import {} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";

import style from "./DiscountGroups.module.css";

const DiscountGroups = (props) => {
  return (
    <div className={`${style.discountGroup} d-flex justify-content-center`}>
      <Link to="/discountgroup/20/1">
        <span className={`d-flex`}>
          <div className={style.lCircle}></div>
          <div
            className={`d-flex justify-content-center align-items-center ${style.rec}`}
          >
            <FontAwesomeIcon icon={faLessThanEqual}></FontAwesomeIcon>{" "}
            &nbsp;&nbsp;20% off
          </div>
          <div className={style.rCircle}></div>
        </span>
      </Link>

      <Link to="/discountgroup/50/20">
        <span className={`d-flex`}>
          <div className={style.lCircle}></div>
          <div
            className={`d-flex justify-content-center align-items-center ${style.rec}`}
          >
            <FontAwesomeIcon icon={faLessThanEqual}></FontAwesomeIcon>{" "}
            &nbsp;&nbsp;50% off
          </div>
          <div className={style.rCircle}></div>
        </span>
      </Link>

      <Link to="/discountgroup/70/50">
        <span className={`d-flex`}>
          <div className={style.lCircle}></div>
          <div
            className={`d-flex justify-content-center align-items-center ${style.rec}`}
          >
            <FontAwesomeIcon icon={faLessThanEqual}></FontAwesomeIcon>{" "}
            &nbsp;&nbsp;70% off
          </div>
          <div className={style.rCircle}></div>
        </span>
      </Link>

      <Link to="/discountgroup/99/70">
        <span className={`d-flex`}>
          <div className={style.lCircle}></div>
          <div
            className={`d-flex justify-content-center align-items-center ${style.rec}`}
          >
            <FontAwesomeIcon icon={faLessThanEqual}></FontAwesomeIcon>{" "}
            &nbsp;&nbsp;99% off
          </div>
          <div className={style.rCircle}></div>
        </span>
      </Link>
    </div>
  );
};

export default DiscountGroups;
