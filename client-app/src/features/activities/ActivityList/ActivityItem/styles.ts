import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.8rem;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 0px 2px;

  header {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    border-bottom: 2px solid #f2f1f2;

    div.left-side {
      img {
        border-radius: 40px;
        width: 80px;
        height: 80px;
      }
    }

    div.rest-side {
      flex: 1;

      h3 {
        font-size: 1.8rem;
        font-weight: bold;
      }

      span {
        font-size: 1.5rem;
      }
    }
  }

  div.content {
    div.local {
      padding: 1rem;
      display: flex;
      flex-direction: row;
      gap: 2rem;

      span {
        display: flex;
        align-items: center;

        font-weight: 500;

        svg {
          margin-right: 0.6rem;
        }
      }
    }

    div.attendees {
      padding: 1rem 1rem;
      background-color: #f2f1f2;
      color: #7c787a;
    }
  }

  div.footer {
    padding: 1rem;
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
