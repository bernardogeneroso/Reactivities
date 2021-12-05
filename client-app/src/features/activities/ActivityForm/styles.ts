import styled from "styled-components";

export const Container = styled.form`
  grid-area: activityForm;
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 1.4rem;

  div.content {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input,
    textarea {
      padding: 1rem;
      border: 1px solid #e6e6e6;
      border-radius: 0.5rem;
      outline: none;

      &::placeholder {
        color: #d9d7d7;
      }
    }
  }

  div.footer {
    margin-top: 1rem;
    display: flex;
    flex-direction: row-reverse;
    gap: 1rem;
  }
`;
