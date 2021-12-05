import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  background-color: #fff;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid #e6e6e6;

  & + div {
    margin-top: 2rem;
  }

  header {
    margin-bottom: 1rem;

    h3 {
      font-size: 1.8rem;
    }

    span.date {
      font-size: 1.4rem;
      color: #54575e;
    }
  }

  div.content {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;

    span {
      font-weight: 300;
    }
  }

  div.footer {
    display: flex;
    flex-direction: row;
    align-items: center;

    span.venue {
      padding: 1rem;
      border-radius: 1rem;
      background-color: #fff;
      border: 2px solid #e6e6e6;
      font-size: 1.2rem;
      font-weight: 500;
    }

    div.options {
      margin-left: auto;
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }
`;
