import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-areas:
    "header sideBar"
    "information sideBar"
    "chat sideBar";
  grid-gap: 2rem;
`;
