import React from "react";
import style from "./Page.module.css";

const Page = (props) => {
  return <div className={style.bg}>{props.children}</div>;
};

export default Page;
