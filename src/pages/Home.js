import React, { useState, useEffect, useContext, createContext } from "react";
import { useParams } from "react-router-dom";
import DiscountGroups from "../components/Content/DiscountGroups";
import Footer from "../components/Content/Footer";
import ProductGroup from "../components/Content/ProductGroup";
import BestDeals from "../components/Content/BestDeals";
import Menu from "../components/Menu/Menu";
import Search from "../components/Search/Search";
import Content from "../components/UI/Content";
import Page from "../components/UI/Page";
import DscntshopContext from "../store/dscntshop-context";

const HomePage = (props) => {
  const params = useParams();
  const ctx = useContext(DscntshopContext);

  // if (props.clearCart) {
  //   const ctxData = {
  //     isLoggedIn: ctx.isLoggedIn,
  //     isAdmin: ctx.isAdmin,
  //     isSuperAdmin: ctx.isSuperAdmin,
  //     isVerified: ctx.isVerified,
  //     userInfo: ctx.userInfo,
  //     cart: [],
  //     filters: ctx.filters,
  //     filtersValue: ctx.filtersValue,
  //     search: ctx.search,
  //     settings: ctx.settings,
  //   };
  //   ctx.updateContext(ctxData);

  //   localStorage.setItem("userinfo", JSON.stringify(ctxData));
  // }

  return (
    <Page>
      <Menu />
      <Search />
      <Content>
        <DiscountGroups />
        <BestDeals />
        <ProductGroup email={params.email} />
      </Content>
      <Footer />
    </Page>
  );
};

export default HomePage;
