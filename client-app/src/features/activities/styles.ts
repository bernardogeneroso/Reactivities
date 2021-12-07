import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  grid-template-areas: "activityList activityFilters";
  gap: 3rem;
`;
