import { createContext, useState, useContext } from "react";

export const SearchResultsContext = createContext();

export const SearchResultsProvider = ({ children, values }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  const value = values || {
    page,
    searchResults,
    hasMore,
    searchValue,
    loading,
    setSearchResults,
    setPage,
    setHasMore,
    setSearchValue,
    setLoading,
  };

  return (
    <SearchResultsContext.Provider value={value}>
      {children}
    </SearchResultsContext.Provider>
  );
};

export const useSearchResults = () => {
  const context = useContext(SearchResultsContext);

  if (context === undefined) {
    throw new Error(
      "useSearchResults must be used within a SearchResultsContext"
    );
  }

  return context;
};
