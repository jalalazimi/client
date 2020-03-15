import React from "react";
import { InstantSearch, Configure } from "react-instantsearch/dom";
import algoliasearch from "algoliasearch/lite";
import Readme from "../components/Readme";
import Topbar from "../components/Topbar";

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY,);

const LibraryDetails = ({package_name, package_user}) => {
  const id = package_user ? `${package_user}/${package_name}` : package_name;
  return <>
    <Topbar/>
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.REACT_APP_INDEX_BY_RELEVANCE}>
      <Configure filters={`objectID:${id}`}/>
      <Readme id={id}/>
    </InstantSearch>
  </>;
};

LibraryDetails.getInitialProps = async (props) => {
  const package_name = props.query['package_name'];
  const package_user = props.query['package_user'];

  return {
    package_name,
    package_user,
  }
};

export default LibraryDetails;
