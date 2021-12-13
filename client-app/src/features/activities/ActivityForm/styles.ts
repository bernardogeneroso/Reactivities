import styled from "styled-components";

export const Container = styled.div`
  grid-area: activityForm;
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 1.4rem;

  h2 {
    font-size: 1.4rem;
    color: #03aba4;
    text-transform: uppercase;
  }

  div.content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  div.footer {
    margin-top: 1rem;
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
  }
`;
