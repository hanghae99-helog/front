import { createGlobalStyle } from "styled-components";

export const theme = {
  black: "rgb(33, 37, 41)",
  gray: "rgb(134, 142, 150)",
  green: "#22c996",
  lightgreen: "#41e2af",
};

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        src: "";
        font-style: normal;
        font-weight: normal;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        // font-size: 100%;
        // font: inherit;
        vertical-align: baseline;
    }

    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    button {
        cursor: pointer;
    }
    li {
        list-style: none;
    }
    input {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        }
        &[type=number] {
        -moz-appearance: textfield;
        }
    }
`;
