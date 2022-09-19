import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
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

const LineChart = (props) => {
  const d = props.data;
  const _date = d?.date.map(
    (x) =>
      `${new Date(x).toLocaleDateString()} ${new Date(x).toLocaleTimeString()}`
  );
  console.log(_date);
  const data = {
    dataLine: {
      labels: _date,
      datasets: [
        {
          label: "Amazon Engine",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: d?.audit.amazon,
        },
        {
          label: "eBay Engine",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: d?.audit.ebay,
        },
      ],
    },
  };

  return (
    <MDBContainer>
      {/* <div style={{ height: "200px", width: "100v" }}> */}
      <Line data={data.dataLine} options={{ responsive: true }} />
      {/* </div> */}
    </MDBContainer>
  );
};

export default LineChart;
