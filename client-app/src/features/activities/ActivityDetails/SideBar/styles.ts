import styled from "styled-components";

export const Container = styled.div`
  grid-area: sideBar;

  height: fit-content;
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

  div.container-people {
    padding: 1rem;
    background-color: #fff;

    div.content {
      position: relative;
      display: flex;
      flex-direction: row;
      gap: 1rem;

      div.left-side {
        img {
          height: 80px;
        }
      }

      div.rest-side {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        h3 {
          color: #1e6799;
          font-size: 1.6rem;
          font-weight: bold;
          margin-bottom: 0.4rem;
        }

        span {
          font-weight: 500;
          font-size: 1.4rem;
          color: #ffbe41;
        }
      }

      div.hosted {
        position: absolute;
        right: -4rem;
        bottom: 3.5rem;
        padding: 0.5rem 2rem;
        color: #fff;
        background-color: #f1651e;
      }
    }
  }
`;
