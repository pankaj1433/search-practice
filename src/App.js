import { SearchResultsProvider } from "./context/searchResults.context";
import { NominatedMoviesProvider } from "./context/nominatedMovies.context";
import { NotifyContextProvider } from "./context/notify.context";

import ErrorBoundary from "./components/ErrorBoundary";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";
import NominatedMovies from "./components/NominatedMovies";
import Notify from "./components/Notify";

import { AppContainer, ResultsWrapper } from "./App.styles";

const App = () => (
  <AppContainer>
    <ErrorBoundary>
      <NotifyContextProvider>
        <SearchResultsProvider>
          <NominatedMoviesProvider>
            <SearchInput />
            <Notify />
            <ResultsWrapper>
              <SearchResults />
              <NominatedMovies />
            </ResultsWrapper>
          </NominatedMoviesProvider>
        </SearchResultsProvider>
      </NotifyContextProvider>
    </ErrorBoundary>
  </AppContainer>
);

export default App;
