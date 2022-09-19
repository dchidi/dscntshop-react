import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import DiscountGroups from "../components/Content/DiscountGroups";
import Footer from "../components/Content/Footer";
import DiscountItems from "../components/Content/DiscountItems";
import Menu from "../components/Menu/Menu";
import Search from "../components/Search/Search";
import Content from "../components/UI/Content";
import Page from "../components/UI/Page";

const DiscountPage = () => {
  // get parameter from url using useParams hook which returns an object
  const param = useParams();
  return (
    <Page>
      <Menu />
      <Search />
      <Content>
        {/* <DiscountGroups /> */}
        <DiscountItems
          upper_bound={param.upper_bound}
          lower_bound={param.lower_bound}
        />
      </Content>
      <Footer />
    </Page>
  );
};

export default DiscountPage;
