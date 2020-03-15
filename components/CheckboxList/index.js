import React from "react";
import { connectRefinementList } from "react-instantsearch-dom";

const CheckBoxItem = ({ label, value, count, isRefined, refine }) => (
  <div className="block mb-1">
    <label className="mr-2 cursor-pointer">
      <input
        className="mr-2"
        type="checkbox"
        checked={isRefined}
        onChange={e => {
          e.preventDefault();
          refine(value);
        }}
      />
      {label}
    </label>
    {count > 0 && (
      <span className="px-2 rounded-full bg-grey-light text-grey-dark text-sm">{count}</span>
    )}
  </div>
);

const Index = connectRefinementList(({ items, attribute, refine, createURL }) => (
  <div>
    {items.length === 0 && <span className="text-grey-dark">No filters available</span>}

    {items.map(item => (
      <CheckBoxItem key={item.label} refine={refine} createURL={createURL} {...item} />
    ))}
  </div>
));

export default Index;
