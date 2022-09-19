import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import DiscountGroups from "../components/Content/DiscountGroups";
import Footer from "../components/Content/Footer";
import MoreItems from "../components/Content/MoreItems";
import Menu from "../components/Menu/Menu";
import Search from "../components/Search/Search";
import Content from "../components/UI/Content";
import Page from "../components/UI/Page";

const MorePage = () => {
  // get parameter from url using useParams hook which returns an object
  const param = useParams();
  return (
    <Page>
      <Menu />
      <Search />
      <Content>
        {/* <DiscountGroups /> */}
        <MoreItems category={param.category} />
      </Content>
      <Footer />
    </Page>
  );
};

export default MorePage;
