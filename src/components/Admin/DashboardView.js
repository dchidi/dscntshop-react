import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardText,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import EditCategoryModal from "./Modal/EditCategoryModal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteCategoryModal from "./Modal/DeleteCategoryModal";
import LineChart from "./Graph/LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faGroupArrowsRotate,
  faLayerGroup,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { ADMIN_DASHBOARD_API, ADMIN_TREND_API } from "../../Endpoints";

const DashboardView = (props) => {
  const [data, setData] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const items = [];

  const fetchDataFnc = () => {
    fetch(ADMIN_DASHBOARD_API)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(fetchDataFnc, [ADMIN_DASHBOARD_API]);

  const fetchTrendDataFnc = () => {
    fetch(ADMIN_TREND_API)
      .then((response) => response.json())
      .then((actualData) => {
        console.log("Trend data");
        console.log(actualData);
        setTrendData(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(fetchTrendDataFnc, [ADMIN_TREND_API]);

  return (
    <>
      <MDBCard style={{ maxWidth: "75rem" }}>
        <MDBCardBody>
          <MDBCardTitle>Dashboard</MDBCardTitle>
          <MDBContainer>
            <MDBRow className="mt-5">
              <MDBCol className="d-flex">
                {/* Users */}
                <MDBCard
                  style={{
                    width: "25%",
                    marginRight: "10px",
                    borderTop: "solid 3px #d25469",
                    color: "#666",
                  }}
                >
                  <MDBCardBody>
                    <MDBCardText>
                      <span style={{ color: "#9f4150" }}>
                        {" "}
                        <FontAwesomeIcon icon={faUsers} /> Users
                      </span>
                      <h1>{data ? data.users : 0}</h1>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
                {/* Categories */}
                <MDBCard
                  style={{
                    width: "25%",
                    marginRight: "10px",
                    borderTop: "solid 3px #ffbc5c",
                    color: "#666",
                  }}
                >
                  <MDBCardBody>
                    <MDBCardText>
                      <span style={{ color: "#f29612" }}>
                        <FontAwesomeIcon icon={faGroupArrowsRotate} />{" "}
                        Categories
                      </span>
                      <h1>{data ? data.categories : 0}</h1>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
                {/* Products */}
                <MDBCard
                  style={{
                    width: "25%",
                    marginRight: "10px",
                    borderTop: "solid 3px #33609d",
                    color: "#666",
                  }}
                >
                  <MDBCardBody>
                    <MDBCardText>
                      <span style={{ color: "#2b4f81" }}>
                        <FontAwesomeIcon icon={faLayerGroup} /> Brands
                      </span>
                      <h1>{data ? data.brands : 0}</h1>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
                {/* Brands */}
                <MDBCard
                  style={{
                    width: "25%",
                    marginRight: "10px",
                    borderTop: "solid 3px #6db1ff",
                    color: "#666s",
                  }}
                >
                  <MDBCardBody>
                    <MDBCardText>
                      <span style={{ color: "#3a82d4" }}>
                        <FontAwesomeIcon icon={faBasketShopping} /> Products
                      </span>
                      <h1>{data ? data.products : 0}</h1>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
            <MDBRow className="my-5">
              <MDBCol>
                <MDBCard>
                  <MDBCardBody>
                    <h5>Crawling Trend</h5>
                    <LineChart data={trendData && trendData.crawling_trend} />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
      {/* <ModalPage /> */}
    </>
  );
};

export default DashboardView;
