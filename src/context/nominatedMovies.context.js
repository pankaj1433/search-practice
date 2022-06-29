import { createContext, useState, useContext } from "react";

export const NominatedMoviesContext = createContext();

export const NominatedMoviesProvider = ({ children }) => {
  const [nominatedMovies, setNominatedMovies] = useState(new Map());

  const value = { nominatedMovies, setNominatedMovies };

  return (
    <NominatedMoviesContext.Provider value={value}>
      {children}
    </NominatedMoviesContext.Provider>
  );
};

export const useNominatedMovies = () => {
  const context = useContext(NominatedMoviesContext);

  if (context === undefined) {
    throw new Error(
      "useNominatedMovies must be used within a NominatedMoviesContext"
    );
  }

  return context;
};
