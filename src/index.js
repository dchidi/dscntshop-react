import React from "react";
import ReactDOM from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MDBContainer } from "mdb-react-ui-kit";

import style from "./Index.module.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DscntshopContextProvider } from "./store/dscntshop-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DscntshopContextProvider>
    <BrowserRouter>
      <MDBContainer fluid className={style.default}>
        <App />
      </MDBContainer>
    </BrowserRouter>
  </DscntshopContextProvider>
);
