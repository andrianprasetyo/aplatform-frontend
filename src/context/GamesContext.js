import React, { createContext, useState } from "react";

export const GamesContext = createContext();

export const GamesProvider = (props) => {
  const [dataGames, setDataGames] = useState(null);
  return (
    <GamesContext.Provider value={[dataGames, setDataGames]}>
      {props.children}
    </GamesContext.Provider>
  );
};
