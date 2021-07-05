import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useService from "../hooks/useService";
import { DataType } from "../dataStore/dataStore";
import Navigation from "./Navigation";
import Parts from "./Parts";
import "./Parts.css";

const Store = () => {
  // selector get 'types' from reduxStore
  const types: Array<string> =
    useSelector((dataStore: DataType) => dataStore.partTypes);

  // local states
  const [typeValue, setTypeValue] = useState("All");
  const [sort, setSort] = useState(false);
  const [reverse, setReverse] = useState(true);
  const [search, setSearch] = useState("");

  // queryParts: function for querying the server
  const { queryParts } = useService();

  // convert 'types' into <options> elements 
  const getOptions = () => {
    let localOptions: Array<JSX.Element> = [];
    if (types && types.length > 0) {
      localOptions = types.map((type: string) => {
        return (
          <option key={type} value={type}>{type}</option>
        );
      });
    }
    // add 'All' to the <options> array
    localOptions = [
      <option key="All" value="All">All</option>,
      ...localOptions
    ];
    return localOptions;
  }

  const onChangeTypeValue = (e: any) => {
    setTypeValue(e.target.value);
  };

  // triggers search when 'type' changes 
  useEffect(() => {
    onClickSearch();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeValue]);

  const onClickSort = () => {
    setSort(true);
    setReverse(!reverse);
  }

  // start search from server.
  // search could be triggered by each 'onChange' on the search input but
  // the server takes a long time to answer, so the requests would pile up.
  const onClickSearch = () => {
    queryParts(search.toLowerCase(), typeValue);
  };

  // starts search with 'Enter' key
  const onPressKey = (e: any) => {
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <div className="Container">
      <Navigation />

      <div className="SearchBar">
        <span className="Search">
          <input type="search" placeholder="Search by name..."
            value={search}
            onKeyPress={onPressKey}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-search"
            onClick={onClickSearch}
            style={{ cursor: "pointer", paddingRight: ".3em" }}></i>
        </span>

        <div>
          <span style={{ marginRight: "0.5em" }}>Choose type</span>
          <select value={typeValue}
            onChange={onChangeTypeValue}
          >
            {getOptions()}
          </select>
        </div>

        <button onClick={onClickSort} style={{ fontSize: "1em" }} >
          <span style={{ padding: "0.3em" }}>Order By Price</span>
          {sort ? (reverse ? <i className="fa fa-arrow-up"></i>
            : <i className="fa fa-arrow-down"></i>) : null}
        </button>
      </div>

      {/* build the cards showing each 'part' with options */}
      <Parts
        sort={sort}
        reverse={reverse}
      />
    </div>
  );
};

export default Store;