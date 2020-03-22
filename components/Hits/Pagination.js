import React from "react";
import { connectPagination } from 'react-instantsearch-dom';
import Paginator from "react-js-pagination";
import { withRouter } from 'next/router'

const Pagination = ({currentRefinement, nbPages, refine, createURL, router}) => {
  const handlePageChange = (page) => {
    refine(page);
  };

  const getPageUrl = (page) => {
    return router.asPath.replace(/page=[1-9]*/ig, `page=${page}`)
  };

  return (
    <Paginator
      hideDisabled={true}
      hideFirstLastPages
      innerClass="ais-Pagination-list"
      activeClass="ais-Pagination-item--selected"
      activePage={currentRefinement}
      itemsCountPerPage={10}
      totalItemsCount={nbPages}
      getPageUrl={getPageUrl}
      pageRangeDisplayed={5}
      onChange={handlePageChange}
    />
  );
};

export default withRouter(connectPagination(Pagination));
