import styled from "styled-components";

export const AppContainer = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  max-width: 1024px;
  margin: auto;
  padding: 0 16px;
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`;

export const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
