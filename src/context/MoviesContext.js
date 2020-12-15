import React, { createContext, useState } from "react";

export const MoviesContext = createContext();

export const MoviesProvider = (props) => {
  const [dataMovies, setDataMovies] = useState(null);
  return (
    <MoviesContext.Provider value={[dataMovies, setDataMovies]}>
      {props.children}
    </MoviesContext.Provider>
  );
};
