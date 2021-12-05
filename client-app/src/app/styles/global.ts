import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

#root {
  height: 100vh;
}

a {
  text-decoration: none;
  color: #000;
}

body,
input,
button,
textarea {
  font: 400 1.6rem "Roboto", sans-serif;
}

button {
  font-weight: 400;
  cursor: pointer;
}
`;
