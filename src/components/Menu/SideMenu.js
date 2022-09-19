import React from "react";
import { Link } from "react-router-dom";
import {} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpider,
  faFingerprint,
  faChartPie,
  faMessage,
  faClipboardQuestion,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

import style from "./SideMenu.module.css";

const SideMenu = (props) => {
  return (
    <div>
      <ul className={style.side}>
        <li>
          <Link
            to="/admin/crawler"
            className={props.page == "crawler" ? style.active : style.inactive}
          >
            Crawler &nbsp; <FontAwesomeIcon icon={faSpider} />
          </Link>
        </li>
        <li>
          <Link
            to="/admin/dashboard"
            className={
              props.page == "dashboard" ? style.active : style.inactive
            }
          >
            Dashboard &nbsp; <FontAwesomeIcon icon={faChartPie} />
          </Link>
        </li>
        {/* <li>
          <Link
            to="/admin/feedback"
            className={props.page == "feedback" ? style.active : style.inactive}
          >
            Feedback &nbsp; <FontAwesomeIcon icon={faMessage} />
          </Link>
        </li>
        <li>
          <Link
            to="/admin/logs"
            className={props.page == "logs" ? style.active : style.inactive}
          >
            Logs &nbsp; <FontAwesomeIcon icon={faClipboardQuestion} />
          </Link>
        </li> */}
        <li>
          <Link
            to="/admin/manageview"
            className={
              props.page == "manageview" ? style.active : style.inactive
            }
          >
            Manage View &nbsp; <FontAwesomeIcon icon={faGears} />
          </Link>
        </li>
        <li>
          <Link
            to="/admin/useraccess"
            className={
              props.page == "useraccess" ? style.active : style.inactive
            }
          >
            User Access &nbsp; <FontAwesomeIcon icon={faFingerprint} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
