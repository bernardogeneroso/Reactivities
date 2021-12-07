import { shade } from "polished";
import styled from "styled-components";

interface FilterProps {
  activated?: boolean;
}

export const Container = styled.div`
  grid-area: activityFilters;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;

  div.content {
    height: fit-content;
    display: flex;
    flex-direction: column;
    border-radius: 0.8rem;
    background-color: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      color: #03aba4;
      font-weight: 500;

      svg {
        color: #03aba4;
      }
    }

    div.container-filters {
      display: flex;
      flex-direction: column;
    }
  }
`;

export const Filter = styled.div<FilterProps>`
  cursor: pointer;
  padding: 1rem;
  border-top: 1px solid rgb(0, 0, 0, 0.15);

  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.05, "#fff")};
  }
`;
