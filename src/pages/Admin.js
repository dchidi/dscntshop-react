import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardView from "../components/Admin/DashboardView";
import CrawlerForm from "../components/Admin/Forms/CrawlerForm";
import ManageView from "../components/Admin/ManageView";
import UserAccess from "../components/Admin/UserAccess";
import Menu from "../components/Menu/Menu";
import SideMenu from "../components/Menu/SideMenu";
import DscntshopContext from "../store/dscntshop-context";

const AdminPage = () => {
  const ctx = useContext(DscntshopContext);
  const navigate = useNavigate();
  if (!ctx.isLoggedIn) navigate("/");

  const param = useParams();
  // get parameter from url
  const p = param.page;

  // Hold list of possible views for admin
  const page = {
    crawler: <CrawlerForm />,
    dashboard: <DashboardView />,
    feedback: "",
    logs: "",
    manageview: <ManageView />,
    useraccess: <UserAccess />,
  };

  return (
    <>
      <Menu />
      <div style={{ borderTop: "1px solid #bbb" }}></div>
      <div className="d-flex p-2 mt-5">
        <div className={`pe-5 `}>
          <SideMenu page={p} />
        </div>
        <div className="flex-fill">{page[p]}</div>
      </div>
    </>
  );
};

export default AdminPage;
