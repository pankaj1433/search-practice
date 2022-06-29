import styled from 'styled-components';

export const ResultBox = styled.section`
    flex: 1;
    background-color: #cdd7d6;
    border-radius: 5px;
    padding: 10px 15px;
    min-height: 300px;
`;

export const BoxTitle = styled.p`
    margin: 0;
    text-align: center;
`;

export const ResultsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: red yellow;
    height: 250px;
    gap: 10px;
    &::-webkit-scrollbar {
        width: 0;
        border: none;
    }
`;

export const EmptyResultsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const MovieItemButton = styled.button`
    background-color: #102542;
    color: #fff;
    border: none;
    padding: 8px;
    border-radius: 4px;
    &:focus-visible {
        outline: none
    }
    &:disabled {
        opacity: 0.5;
    }
`;

export const MovieItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const LoadMoreButton = styled.button`
    background-color: #f87060;
    color: #fff;
    border: none;
    padding: 8px;
    border-radius: 4px;
    &:focus-visible {
        outline: none
    }
`;
