import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
}

export const Container = styled.button<ContainerProps>`
  border: 0;
  padding: 0.6rem 1.4rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  color: #fff;
  background-color: ${(props) => props.bgColor};

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
