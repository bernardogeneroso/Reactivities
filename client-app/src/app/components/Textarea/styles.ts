import styled from "styled-components";

interface ContainerProps {
  error: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  textarea {
    background-color: ${(props) => (props.error ? "#f8d7da" : "#fff")};
    padding: 1rem;
    border: 1px solid ${(props) => (props.error ? "#e7bfc3" : "#e6e6e6")};
    border-radius: 0.5rem;
    outline: none;

    &::placeholder {
      color: ${(props) => (props.error ? "#874f4f" : "#d9d7d7")};
    }
  }

  span {
    margin-top: 0.3rem;
  }
`;
