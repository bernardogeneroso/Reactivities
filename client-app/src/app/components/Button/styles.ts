import styled from "styled-components";

interface ContainerProps {
  situation: "positive" | "negative" | "none" | "default";
}

const colors = {
  positive: "#4EAC4D",
  negative: "#f94d6a",
  none: "#DBDCE1",
  default: "#0d68f0",
};

export const Container = styled.button<ContainerProps>`
  border: 0;
  padding: 0.6rem 1.4rem;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  color: #fff;
  background-color: ${(props) => colors[props.situation]};
  color: ${(props) => (props.situation === "none" ? "#000" : "#fff")};

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;
