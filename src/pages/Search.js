import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Content/Footer";
import SearchedItems from "../components/Content/SearchedItems";
import Menu from "../components/Menu/Menu";
import Search from "../components/Search/Search";
import Content from "../components/UI/Content";
import Page from "../components/UI/Page";

const SearchPage = () => {
  const param = useParams();
  return (
    <Page>
      <Menu />
      <Search />
      <Content>
        <SearchedItems searchword={param.search} />
      </Content>
      <Footer />
    </Page>
  );
};

export default SearchPage;
