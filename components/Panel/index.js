import React from "react";

const Index = ({ title, children }) => (
  <div>
    <h3 className="mb-2 font-normal tracking-wide text-xs uppercase text-grey select-none">{title}</h3>
    {children}
  </div>
);

export default Index;
