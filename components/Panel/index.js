import React from "react";

const Index = ({title, children}) => (
  <>
    <h3 className="mb-2 font-normal tracking-wide text-xs uppercase text-grey select-none">{title}</h3>
    {children}
  </>
);

export default Index;
