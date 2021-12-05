import styled from "styled-components";

export const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  margin-top: 5rem;
  display: grid;
  grid-template-columns: 1fr 350px;
  grid-template-areas: "activityList panelSticky";
  gap: 4rem;
`;

export const PanelSticky = styled.div`
  grid-area: panelSticky;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
