import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & + div {
    margin-top: 2rem;
  }

  h3.group {
    color: #03aba4;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
