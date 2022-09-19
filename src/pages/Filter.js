import React from "react";
import { useParams } from "react-router-dom";
import FilteredItems from "../components/Content/FilteredItems";
import Footer from "../components/Content/Footer";
import Menu from "../components/Menu/Menu";
import Search from "../components/Search/Search";
import Content from "../components/UI/Content";
import Page from "../components/UI/Page";

const FilterPage = () => {
  const param = useParams();
  return (
    <Page>
      <Menu />
      <Search />
      <Content>
        <FilteredItems />
      </Content>
      <Footer />
    </Page>
  );
};

export default FilterPage;
