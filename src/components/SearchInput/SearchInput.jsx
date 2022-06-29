import { Input, SearchIcon, InputWrapper } from './SearchInput.styles';

import useSearch from '../../hooks/useSearch';

const SearchInput = () => {
    const { handleSearch } = useSearch();

    return (
        <InputWrapper>
            <Input
                type="text"
                onChange={handleSearch}
                placeholder="Search Movie..." />
            <SearchIcon className="material-symbols-outlined">search</SearchIcon>
        </InputWrapper>
    )
}

export default SearchInput;
