import { useEffect, useCallback } from 'react';

import { useSearchResults } from '../context/searchResults.context';
import { get } from '../utils/fetch';
import debounce from '../utils/debounce';

const useSearch = () => {
    const {
        searchResults,
        setSearchResults,
        page,
        hasMore,
        setPage,
        setHasMore,
        searchValue,
        setSearchValue,
        setLoading } = useSearchResults();

    const resetSearch = useCallback(() => {
        setSearchResults([]);
        setPage(1);
        setHasMore(false);
    }, [setSearchResults, setPage, setHasMore]);

    const setEndOfList = useCallback((totalResults) => {
        const lastPageNumber = Math.ceil((+totalResults) / 10);
        if (page === lastPageNumber) {
            setHasMore(false);
        }
    }, [page, setHasMore]);

    const loadMoreData = useCallback((params) => {
        const options = { params };
        setLoading(true);
        get({ options }).then((data) => {
            if (data.Response === "True") {
                setSearchResults([
                    ...searchResults,
                    ...data.Search
                ]);
                setEndOfList(data.totalResults);
                setLoading(false);
            }
        });
    }, [searchResults, setSearchResults, setEndOfList, setLoading]);

    const performSearch = useCallback((params) => {
        const options = { params };
        setLoading(true);
        get({ options }).then((data) => {
            if (data.Response === "True") {
                setSearchResults(data.Search);
                setHasMore(true);
                setEndOfList(data.totalResults);
                setLoading(false);
            } else {
                resetSearch();
            }
        });
    }, [setSearchResults, resetSearch, setEndOfList, setHasMore, setLoading]);

    const handleSearch = debounce(useCallback((event) => {
        setSearchValue(event.target.value);
        if (event.target.value === '') {
            resetSearch();
            return;
        }
        performSearch({ s: event.target.value, page })
    }, [page, performSearch, resetSearch, setSearchValue,]), 600);

    useEffect(() => {
        if (hasMore) {
            loadMoreData({ s: searchValue, page });
        }
        // eslint-disable-next-line
    }, [page]);

    return {
        handleSearch,
        searchResults,
        searchValue
    }
}

export default useSearch;
