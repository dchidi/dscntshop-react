import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import style from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={style.bg}>
      <h5 style={{ color: "#c2ddf9", marginBottom: "20px" }}>
        A GRIFFITH COLLEGE MSC COMPUTING FINAL PROJECT
      </h5>
      <div style={{ fontSize: "20px" }}>
        <span style={{ color: "#91aac5", fontSize: "16px" }}>Developed by</span>
        {" - "}
        CHIDI DURU
      </div>
      <div>
        <span style={{ color: "#91aac5", fontSize: "16px" }}>
          Student Number
        </span>
        {" - "}
        3041766
      </div>
      <hr />
      <div style={{ color: "#91aac5", fontSize: "13px" }}>&copy; 2022</div>
    </div>
  );
};

export default Footer;
