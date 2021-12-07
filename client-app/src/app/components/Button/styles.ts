import styled from "styled-components";

import { Situations } from ".";

interface ContainerProps {
  situation: Situations;
}

const colors = {
  master: "#f1651e",
  positive: "#4EAC4D",
  negative: "#f94d6a",
  none: "#DBDCE1",
  default: "#03aba4",
};

export const Container = styled.button<ContainerProps>`
  border: 0;
  padding: 0.6rem 1.4rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  background-color: ${(props) => colors[props.situation]};
  color: ${(props) => (props.situation === "none" ? "#2c2c2c" : "#fff")};
  font-weight: 500;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  div {
    display: flex;
    align-items: center;
  }
`;
