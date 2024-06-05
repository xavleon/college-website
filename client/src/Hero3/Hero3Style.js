/* Color ---------------------------------------------- */

/* Box Sizing ----------------------------------------- */

/* Text, Tag Style ------------------------------------ */

import styled from "styled-components";

export const Container = styled.div`
  a,
  li {
    text-decoration: none;
    list-style: none;
  }
  p,
  span {
    font-weight: 300;
  }
  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    background-color: black;
    color: white;
  }

  /* Text Style ----------------------------------------- */

  .text-xl {
    font-size: clamp(2rem, 10.4vw, 3.2rem);
    font-weight: 600;
  }
  .text-lg {
    font-size: clamp(1.2rem, 8.8vw, 2.8rem);
    font-weight: 600;
  }
  .text-md {
    font-size: clamp(0.8rem, 6vw, 1.6rem);
    font-weight: 400;
    line-height: 1.3;
  }
  .text-sm {
    font-size: clamp(0.6rem, 4.5vw, 1.2rem);
    font-weight: 300;
    line-height: 1.5;
  }
  .text-error {
    position: absolute;
    left: 0.1rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: orange;
    display: none;
  }
  .text-center {
    text-align: center;
  }

  /* Grid ----------------------------------------------- */

  .border-gray {
    border-bottom: 0.4rem solid var(--color-input);
  }

  /* Spacing -------------------------------------------- */

  .margin-top {
    margin-top: 1rem;
  }
  .margin-top-1 {
    margin-top: 1.4rem;
  }
  .margin-bottom-1 {
    margin-bottom: 1.4rem;
  }
  .margin-inline {
    margin-inline: auto;
  }
  .margin-left {
    margin-left: 0.6rem;
  }

  /* Button -------------------------------------------- */

  button,
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    font-size: 1.1em;
    font-family: inherit;
    font-weight: inherit;
    padding: 1.1em;
    border: none;
    border-radius: 4px;
    color: white;
    height: 3.2rem;
    max-width: 100%;
  }
  .btn-primary {
    font-size: 1.2em;
    background: #3366cc;
    margin-inline: auto;
  }
  .btn-signin {
    height: 2.2rem;
    padding: 0.8em;
    background-color: var(--color-invalid);
    font-size: 1em;
  }
  .btn-primary:hover,
  .btn-signin:hover {
    background-color: var(--color-invalid-hover);
  }

  /* Logo ---------------------------------------------- */

  .logo {
    margin-top: 0.4rem;
    width: 8rem;
  }

  /* Nav ----------------------------------------------- */

  .nav {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1.4rem 3.2rem;
    z-index: 2;
  }
  .nav-4 {
    position: absolute;
    justify-content: space-between;
  }
  .right {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  /* Input Field & State-------------------------------- */

  ::placeholder {
    color: transparent;
  }
  ::-ms-input-placeholder {
    color: transparent;
  }
  label {
    color: white;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  }
  .input {
    position: relative;
  }
  .input-field {
    border: none;
    outline: none;
    font-size: 1em;
    border-radius: 4px;
    padding-inline: 1.36em;
    padding-block: 1.8em 1em;
    height: 4rem;
    width: 100%;
  }
  .input-label {
    display: grid;
    position: absolute;
    top: 1.36rem;
    left: 1.36rem;
    color: gray;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
  }
  .input-field:focus ~ .label-size,
  .input-field:not(:placeholder-shown) ~ .label-size {
    top: 0.6rem;
    left: 1.36rem;
    font-size: 0.9em;
  }
  .input-field:valid {
    border: 2px solid var(--color-valid);
  }
  .input-field:not(:placeholder-shown):invalid {
    border-bottom: 3px solid orange;
  }
  .input-field:not(:placeholder-shown):invalid ~ .text-error {
    display: block;
  }

  /* Header Container ------------------------------------------------------ */

  .header {
    position: relative;
    display: grid;
    justify-content: center;
    align-items: center;
    min-height: 96vh;
    background: url("https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center/cover no-repeat;
    overflow: hidden;
  }
  .header::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-bg-2);
    box-shadow: var(--header-box-shadow);
    border-bottom: 0.4rem solid var(--color-input);
    z-index: 1;
  }
  .header-container {
    max-width: 42rem;
    padding-block: 4rem;
    padding-inline: 4%;
    z-index: 2;
  }

  /* Language Option ----------------------------------- */

  .language {
    position: relative;
  }
  .language-select {
    appearance: none;
    cursor: pointer;
    height: 2.4rem;
    max-width: 12rem;
    border-radius: 0.2rem;
    padding-inline: 2.4rem;
    outline: none;
    color: gray;
    background-color: transparent;
  }
  .language-icon {
    position: absolute;
    height: 100%;
    top: 0;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
  }
  .globe {
    position: absolute;
    left: 1rem;
  }
  .chevron {
    position: absolute;
    left: 10rem;
  }

  .top {
    height: 2.2rem;
    padding-inline: 0.6rem;
    width: 3.6rem;
    color: white;
    font-weight: 600;
    border: 1.8px solid white;
  }
  .top-icon {
    color: white;
  }
  .chevron-top {
    position: absolute;
    left: 2.4rem;
    font-size: 0.6rem;
    font-weight: 600;
  }

  /* Media Query --------------------------------------- */

  @media (768px <= width <= 940px) {
    .header {
      min-height: 72vh;
    }
  }

  @media (320px <= width <= 730px) {
    .nav {
      padding: 1.4rem;
    }
  }

  @media (350px <= width <= 520px) {
    .header {
      min-height: 93vh;
    }
    .down {
      display: block;
    }

    @media (320px <= width <= 350px) {
      .header {
        height: 80vh;
      }
      .down {
        display: block;
      }
    }
  }

  @media (min-width: 2048px) {
    nav,
    .header-container,
    footer {
      zoom: 2;
    }
  }
`;
