import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Details from "../components/Profile/Details";
import Orders from "../components/Profile/Orders";
import Address from "../components/Profile/Address";
// import Payments from "../components/Profile/Payments";
// import Returns from "../components/Profile/Returns";
import Menu from "../components/Menu/Menu";
import ProfileMenu from "../components/Menu/ProfileMenu";
import DscntshopContext from "../store/dscntshop-context";

const ProfilePage = () => {
  const ctx = useContext(DscntshopContext);
  const navigate = useNavigate();
  if (!ctx.isLoggedIn) navigate("/");

  const param = useParams();
  // get parameter from url
  const p = param.page;

  // Hold list of possible views for admin
  const page = {
    details: <Details />,
    orders: <Orders />,
    address: <Address />,
    // payments: <Payments />,
    // returns: <Returns />,
  };

  return (
    <>
      <Menu />
      <div style={{ borderTop: "1px solid #bbb" }}></div>
      <div className="d-flex p-2 mt-5">
        <div className={`pe-5 `}>
          <ProfileMenu page={p} />
        </div>
        <div className="flex-fill">{page[p]}</div>
      </div>
    </>
  );
};

export default ProfilePage;
