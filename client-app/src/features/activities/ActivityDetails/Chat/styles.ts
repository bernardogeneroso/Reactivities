import styled from "styled-components";

export const Container = styled.div`
  grid-area: chat;
  margin-bottom: 2rem;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  header {
    padding: 1rem;
    border-top-left-radius: 0.8rem;
    border-top-right-radius: 0.8rem;
    background-color: #03aba4;
    text-align: center;
    color: #fff;
    font-size: 1.4rem;
    font-weight: 500;
  }

  div.sub-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    gap: 2rem;

    div.chat-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      div.message-container {
        display: flex;
        flex-direction: row;
        gap: 1.4rem;

        img {
          height: 38px;
        }

        div.rest-side {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;

          div.header-message {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1rem;

            h3 {
              font-size: 1.4rem;
              font-weight: 600;
            }

            span {
              font-size: 1.2rem;
              color: #bebebe;
            }
          }

          div.message {
            font-size: 1.4rem;
            white-space: pre-wrap;
          }
        }
      }
    }

    form.ui.form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      button[type="submit"] {
        margin-left: auto;
      }
    }
  }
`;
