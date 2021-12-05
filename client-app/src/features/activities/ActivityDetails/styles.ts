import styled from "styled-components";
import { lighten } from "polished";

export const Container = styled.div`
  grid-area: activityDetails;
  height: fit-content;
  background-color: #fff;
  border-radius: 0.8rem;

  img {
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
    width: 100%;
  }

  div.content {
    padding: 1.4rem;
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 1.8rem;
    }

    span.date {
      font-size: 1.4rem;
      color: #54575e;
    }

    span.releaseDate {
      margin-top: 1rem;
    }
  }

  div.footer {
    display: flex;
    flex-direction: row;
    border-top: 1px solid #e5e5e5;
    padding: 1.4rem;

    button {
      padding: 0.6rem 1rem;
      flex: 1;
      font-weight: 500;
      background-color: transparent;

      &:first-child {
        color: #0d68f0;
        border: 1px solid #0d68f0;
        border-top-left-radius: 0.4rem;
        border-bottom-left-radius: 0.4rem;

        transition: all 0.2s;

        &:hover {
          color: #fff;
          background-color: ${lighten(0.1, "#0d68f0")};
        }
      }

      &:last-child {
        color: #787c7e;
        border: 1px solid #787c7e;
        border-top-right-radius: 0.4rem;
        border-bottom-right-radius: 0.4rem;

        transition: all 0.2s;

        &:hover {
          color: #fff;
          background-color: ${lighten(0.1, "#787c7e")};
        }
      }
    }
  }
`;
