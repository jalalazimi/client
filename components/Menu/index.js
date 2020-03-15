import React from "react";
import { connectMenu } from "react-instantsearch-dom";

const MenuItem = ({ label, value, count, isRefined, refine, createURL }) => (
  <a
    href={createURL(value)}
    onClick={e => {
      e.preventDefault();
      refine(value);
    }}
    className="block no-underline text-black mb-2"
    key={label}>
    <span className={`mr-2 ${isRefined && "font-bold"}`}>{label}</span>
    {count > 0 && (
      <span className="px-2 rounded-full bg-grey-light text-grey-dark text-sm">{count}</span>
    )}
  </a>
);

const Index = ({ attributeName, currentRefinement, items, ...otherProps }) => (
  <div>
    {items.length === 0 && <span className="text-grey-dark">No filters available</span>}

    {items.length > 0 && (
      <MenuItem
        label="All"
        value={null}
        isRefined={!currentRefinement && items.length}
        {...otherProps}
      />
    )}

    {items.map(item => <MenuItem key={item.label} {...otherProps} {...item} />)}
  </div>
);

export default connectMenu(Index);
