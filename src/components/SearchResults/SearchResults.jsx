import { useCallback } from "react";
import {
  ResultBox,
  BoxTitle,
  ResultsWrapper,
  MovieItemButton,
  EmptyResultsWrapper,
  MovieItem,
  LoadMoreButton,
} from "../component.styles";

import { useSearchResults } from "../../context/searchResults.context";
import { useNominatedMovies } from "../../context/nominatedMovies.context";

import useNotify from "../../hooks/useNotify";

const SearchResults = () => {
  const { searchResults, page, setPage, hasMore, searchValue, loading } =
    useSearchResults();
  const { nominatedMovies, setNominatedMovies } = useNominatedMovies();
  const notify = useNotify();

  const handleLoadMoreClick = useCallback(
    () => setPage(page + 1),
    [setPage, page]
  );

  const handleNominate = useCallback(
    (event) => {
      const imdbID = event.target?.dataset?.imdbid;
      if (imdbID && nominatedMovies.size < 5) {
        const nominatedMovie = searchResults.find(
          (movie) => movie.imdbID === imdbID
        );
        setNominatedMovies(
          new Map(nominatedMovies.set(imdbID, nominatedMovie))
        );
      } else if (nominatedMovies.size >= 5) {
        notify("You cannot nominate more than 5 movies!");
      }
    },
    [nominatedMovies, searchResults, setNominatedMovies, notify]
  );

  if (searchValue === "") {
    return (
      <ResultBox data-testid="empty-search-results">
        <EmptyResultsWrapper>
          Search Results will appear here
        </EmptyResultsWrapper>
      </ResultBox>
    );
  }

  return (
    <ResultBox data-testid="search-results">
      <BoxTitle>Results for "{searchValue}"</BoxTitle>
      {searchResults.length !== 0 ? (
        <ResultsWrapper onClick={handleNominate}>
          {searchResults.map((movie) => (
            <MovieItem key={movie.imdbID}>
              {`${movie.Title} (${movie.Year})`}
              <MovieItemButton
                data-testid={movie.imdbID}
                disabled={nominatedMovies.has(movie.imdbID)}
                data-imdbid={movie.imdbID}
              >
                Nominate
              </MovieItemButton>
            </MovieItem>
          ))}
          {loading && <div>Loading More Data...</div>}
          {hasMore && !loading && (
            <LoadMoreButton
              data-testid="load-more-btn"
              onClick={handleLoadMoreClick}
            >
              Loading More
            </LoadMoreButton>
          )}
        </ResultsWrapper>
      ) : (
        !loading && <EmptyResultsWrapper>No Result Found</EmptyResultsWrapper>
      )}
    </ResultBox>
  );
};

export default SearchResults;
