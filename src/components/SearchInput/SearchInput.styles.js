import styled from 'styled-components'

export const InputWrapper = styled.div`
    margin: 16px 0;
    border-radius: 5px;
    position: relative;
    display: flex;
`;

export const Input = styled.input`
    background-color: #cdd7d6;
    color: #102542;
    flex: 1;
    padding: 10px 15px;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    font-weight: 500;
    &:focus-visible {
        outline: none
    }
`;

export const SearchIcon = styled.span`
    position: absolute;
    top: calc(50% - 15px);
    right: 15px;
    font-size: 30px;
    line-height: 30px;
    color: #102542;
`;
