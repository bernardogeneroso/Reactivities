import styled from "styled-components";

export const Container = styled.div`
  grid-area: information;

  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  div.content {
    padding: 1.4rem 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    font-size: 1.5rem;
    font-weight: 500;

    & + div {
      border-top: 2px solid #e6e6e6;
    }

    svg {
      color: #03aba4;
      margin-right: 2rem;
    }
  }
`;
