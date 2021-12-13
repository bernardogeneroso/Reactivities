import styled from "styled-components";

export const Container = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: #fff;
  border-radius: 0.8rem;
  border: 0.2rem solid #e6e6f0;
  padding: 6rem;
  text-align: center;

  h1 {
    margin: 0;
  }

  button {
    background-color: #2378cc;
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 0.8rem;
    border: 0;
    font-size: 1.4rem;
    font-weight: 500;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
