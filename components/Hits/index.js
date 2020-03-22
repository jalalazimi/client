import React from "react";
import { connectHits, connectStateResults } from "react-instantsearch-dom";
import Pagination from "./Pagination"
import humanizedNumber from "./humanizedNumber";
import Hit from "./Hit";

const NoResults = connectStateResults(
  ({searchState, searchResults}) =>
    searchResults &&
    searchResults.nbHits === 0 && (
      <div className="bg-white text-black p-3 text-grey-dark text-xl w-full">
        No results have been found for {searchState.query}.
      </div>
    )
);

const Hits = connectHits(({hits}) => (
  <>
    <NoResults/>
    {hits.map((hit) => [
      <Hit hit={hit} key={hit.objectID}/>,
    ])}
    <Pagination number={4}/>
  </>
));

export default Hits;
