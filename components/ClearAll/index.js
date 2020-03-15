import React from "react";
import { connectCurrentRefinements } from "react-instantsearch-dom";

const Index = connectCurrentRefinements(
  ({ items, refine }) =>
    items.length > 0 && (
      <button
        onClick={() => refine(items)}
        className="tracking-tight mb-2 float-right text-orange-dark">
        Clear filters
      </button>
    )
);

export default Index;
