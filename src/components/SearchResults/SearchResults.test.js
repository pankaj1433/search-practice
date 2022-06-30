import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react";

import SearchResults from "./SearchResults";
import { NotifyContextProvider } from "../../context/notify.context";
import { SearchResultsProvider } from "../../context/searchResults.context";
import { NominatedMoviesProvider } from "../../context/nominatedMovies.context";

import { mockMovieData } from "../../testHelpers/mockMovieData";

const customRender = (
  ui,
  {
    searchResultsContextProps,
    notifyContextProps,
    nominatedMoviesContextProps,
    ...renderOptions
  }
) => {
  return render(
    <NotifyContextProvider values={notifyContextProps}>
      <SearchResultsProvider values={searchResultsContextProps}>
        <NominatedMoviesProvider values={nominatedMoviesContextProps}>
          {ui}
        </NominatedMoviesProvider>
      </SearchResultsProvider>
    </NotifyContextProvider>,
    renderOptions
  );
};

const mockSetPage = jest.fn();
const mockSetNominatedMovies = jest.fn();
const mockSetNotification = jest.fn();

const searchResultsContextProps = {
  page: 1,
  searchResults: [],
  hasMore: false,
  searchValue: "",
  loading: true,
  setPage: mockSetPage,
  setSearchResults: jest.fn(),
  setHasMore: jest.fn(),
  setSearchValue: jest.fn(),
  setLoading: jest.fn(),
};

const nominatedMoviesContextProps = {
  nominatedMovies: new Map(),
  setNominatedMovies: mockSetNominatedMovies,
};

const notifyContextProps = {
  notification: "",
  setNotification: mockSetNotification,
};

const MOCK_MOVIE_ONE_NAME = "Demo Movie 1";
const MOCK_MOVIE_TWO_NAME = "Demo Movie 2";

describe("When Search Results is rendered", () => {
  beforeEach(() =>
    customRender(<SearchResults />, {
      searchResultsContextProps,
      nominatedMoviesContextProps,
      notifyContextProps,
    })
  );

  afterEach(cleanup);

  test("should render empty search results box", () => {
    expect(screen.queryByTestId("empty-search-results")).toBeInTheDocument();
  });

  test("should NOT render search results box", () => {
    expect(screen.queryByTestId("search-results")).not.toBeInTheDocument();
  });

  describe("when there is search data available in context", () => {
    beforeAll(() => {
      searchResultsContextProps.searchValue = "Demo Movie";
      searchResultsContextProps.searchResults = mockMovieData.Search;
      searchResultsContextProps.loading = false;
    });

    test("should NOT render empty search results box", async () => {
      await waitFor(() =>
        expect(
          screen.queryByTestId("empty-search-results")
        ).not.toBeInTheDocument()
      );
    });

    test("should render search results box", async () => {
      await waitFor(() =>
        expect(screen.queryByTestId("search-results")).toBeInTheDocument()
      );
    });

    test("should render search results", async () => {
      await waitFor(() => {
        expect(screen.queryByText(MOCK_MOVIE_ONE_NAME)).toBeInTheDocument();
        expect(screen.queryByText(MOCK_MOVIE_TWO_NAME)).toBeInTheDocument();
      });
    });

    describe("and there is NO more data left to load", () => {
      beforeAll(() => (searchResultsContextProps.hasMore = false));

      test("should NOT render load more button", async () => {
        await waitFor(() =>
          expect(screen.queryByTestId("load-more-btn")).not.toBeInTheDocument()
        );
      });
    });

    describe("and there is more data left to load", () => {
      beforeAll(() => (searchResultsContextProps.hasMore = true));

      test("should render load more button", async () => {
        await waitFor(() =>
          expect(screen.queryByTestId("load-more-btn")).toBeInTheDocument()
        );
      });

      describe("and the load more button is clicked", () => {
        beforeEach(() =>
          fireEvent.click(screen.queryByTestId("load-more-btn"))
        );

        test("should call setPage from context", () => {
          expect(mockSetPage).toHaveBeenCalled();
        });
      });
    });

    describe("and the nominate button is clicked for first five movies", () => {
      beforeEach(() => {
        fireEvent.click(screen.queryByTestId("imdbId1"));
        fireEvent.click(screen.queryByTestId("imdbId2"));
        fireEvent.click(screen.queryByTestId("imdbId3"));
        fireEvent.click(screen.queryByTestId("imdbId4"));
        fireEvent.click(screen.queryByTestId("imdbId5"));
      });

      test("should call setNominatedMovies from context", () => {
        expect(mockSetNominatedMovies).toHaveBeenCalledTimes(5);
      });
    });

    describe("and the nominate button is clicked for sixth time", () => {
      beforeEach(() => fireEvent.click(screen.queryByTestId("imdbId6")));

      test("should NOT call setNominatedMovies from context", () => {
        expect(mockSetNominatedMovies).not.toHaveBeenCalled();
      });

      test("should call setNotification from context", () => {
        expect(mockSetNotification).toHaveBeenCalledWith(
          "You cannot nominate more than 5 movies!"
        );
      });
    });
  });
});
