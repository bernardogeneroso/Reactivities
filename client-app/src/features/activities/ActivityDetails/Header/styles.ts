import styled from "styled-components";

export const Container = styled.div`
  grid-area: header;

  div.content {
    position: relative;
    margin-bottom: -0.3rem;

    img {
      width: 100%;
      filter: brightness(0.4);
    }

    div.hover-image {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
      max-width: 80%;
      width: 100%;
      display: flex;
      flex-direction: column;
      color: #fff;
      padding-bottom: 4rem;

      h1 {
        margin-bottom: 0;
      }

      span {
        color: #f1f1f1;
        font-size: 1.4rem;
      }

      span.hostedBy {
        margin-top: 1rem;

        a {
          color: #fff;
          font-weight: 500;

          transition: filter 0.2s;

          &:hover {
            filter: brightness(0.8);
          }
        }
      }
    }
  }

  div.footer {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom-left-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    div.actions {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }

    div.rest-side {
      margin-left: auto;
    }
  }
`;
