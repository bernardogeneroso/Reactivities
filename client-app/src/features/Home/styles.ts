import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  background-image: linear-gradient(
    135deg,
    rgb(24, 42, 115) 0%,
    rgb(33, 138, 174) 69%,
    rgb(32, 167, 172) 89%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  color: #fff;

  h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    font-size: 6rem;

    img {
      height: 60px;
    }
  }

  div.content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    h2 {
      font-size: 2.6rem;
    }

    button {
      padding: 1.4rem 6rem;
      color: #fff;
      font-size: 2rem;
      background-color: transparent;
      font-weight: 500;
      border: 2px solid #fff;
      border-radius: 0.8rem;
    }
  }
`;
