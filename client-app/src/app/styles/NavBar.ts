import styled from "styled-components";

export const Container = styled.div`
  background-image: linear-gradient(
    135deg,
    rgb(24, 42, 115) 0%,
    rgb(33, 138, 174) 69%,
    rgb(32, 167, 172) 89%
  );

  nav {
    height: 52px;
    max-width: 1120px;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    flex-direction: row;
    align-items: center;

    div.activities {
      display: flex;
      flex-direction: row;
      align-items: center;

      color: #fff;

      img {
        margin-right: 1rem;
        width: 35px;
        height: 35px;
      }
    }

    div.menu {
      margin-left: 4rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 2rem;

      div.cover {
        a {
          color: #fff;
          font-size: 1.4rem;

          transition: filter 0.2s;

          &:hover {
            filter: brightness(0.9);
          }
        }
      }
    }

    div.user {
      margin-left: auto;

      .ui.dropdown > .divider,
      .ui.dropdown > .dropdown.icon:before {
        color: #fff;
      }
    }
  }
`;
