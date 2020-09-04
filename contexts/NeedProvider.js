import React, { createContext, useState } from "react";

export const needContext = createContext([]);

const NeedProvider = (props) => {
  const value = useState([]);

  return (
    <needContext.Provider value={value}>{props.children}</needContext.Provider>
  );
};

export default NeedProvider;
