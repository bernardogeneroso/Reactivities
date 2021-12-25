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

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 0;
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

.react-calendar {
  width: 100%;
  border: none;
  box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
  border-radius: 0.8rem;
}

.react-datepicker-wrapper, input {
  width: 100%;
}

.react-datepicker {
  font-size: 1rem;
}

.ui.dropdown .menu>.item {
  font-size: 1.6rem;
}

.ui.dropdown .menu .active.item {
  font-weight: 500;
}

.ui.label, .ui.labels .label {
  font-size: 1.4rem;
  font-weight: 500;
}

.ui.segment, .ui.segments .segment, .ui.menu, .ui.form textarea{
  font-size: 1.6rem;
}

.ui.buttons.imgPreview {
  margin-top: 1rem;
  width: 100%;
}
`;
