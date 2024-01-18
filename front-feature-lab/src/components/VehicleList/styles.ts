import styled from "styled-components";

export const CardsWrapper = styled.div`
  display: grid;
  max-width: 1420px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  justify-content: center;
  padding: 16px;
`;
