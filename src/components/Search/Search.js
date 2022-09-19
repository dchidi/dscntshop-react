import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {} from "mdb-react-ui-kit";

import style from "./Search.module.css";
import FilterModal from "../Modal/FilterModal";
import DscntshopContext from "../../store/dscntshop-context";

const Search = (props) => {
  const _searchInput = useRef();
  const navigate = useNavigate();

  const ctx = useContext(DscntshopContext);

  const searchHandler = (e) => {
    e.preventDefault();
    const search = _searchInput.current.value;
    // window.location.href = `/search/${search}`;
    navigate(`/search/${search}`);
  };

  return (
    <form onSubmit={searchHandler}>
      <div className={`${style.search}`}>
        <div
          className={`p-5  ${style.search_blur} d-flex justify-content-center`}
        >
          <input
            type="text"
            placeholder="Search..."
            className={`lg-w-75 ${style.input}`}
            ref={_searchInput}
          />
          <FilterModal filterCss={style.filter} filters={ctx.filters} />
        </div>
      </div>
    </form>
  );
};

export default Search;
