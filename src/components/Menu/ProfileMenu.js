import React from "react";
import { Link } from "react-router-dom";
import {} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faBagShopping,
  faLocationDot,
  faCreditCard,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";

import style from "./SideMenu.module.css";

const ProfileMenu = (props) => {
  return (
    <div>
      <ul className={style.side}>
        <li>
          <Link
            to="/profile/details"
            className={props.page == "details" ? style.active : style.inactive}
          >
            Details &nbsp; <FontAwesomeIcon icon={faCircleInfo} />
          </Link>
        </li>
        <li>
          <Link
            to="/profile/orders"
            className={props.page == "orders" ? style.active : style.inactive}
          >
            Orders &nbsp; <FontAwesomeIcon icon={faBagShopping} />
          </Link>
        </li>
        {/* <li>
          <Link
            to="/profile/address"
            className={props.page == "address" ? style.active : style.inactive}
          >
            Address &nbsp; <FontAwesomeIcon icon={faLocationDot} />
          </Link>
        </li> */}
        {/* <li>
          <Link
            to="/profile/payments"
            className={props.page == "payments" ? style.active : style.inactive}
          >
            Payments &nbsp; <FontAwesomeIcon icon={faCreditCard} />
          </Link>
        </li>
        <li>
          <Link
            to="/profile/returns"
            className={props.page == "returns" ? style.active : style.inactive}
          >
            Returns &nbsp; <FontAwesomeIcon icon={faRightLeft} />
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default ProfileMenu;
