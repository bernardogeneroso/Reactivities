import styled from "styled-components";

export const Container = styled.div`
  .content {
    display: flex !important;
    align-items: center;
  }

  .four.wide.column {
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .two {
      width: 100%;
      display: flex !important;
      flex-direction: row;

      div.value {
        font-size: 6rem !important;
      }

      div.label {
        font-size: 1.6rem !important;
      }
    }

    .divider {
      width: 100%;
    }

    .reveal {
      width: 100%;
    }
  }
`;
