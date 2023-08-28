import { createGlobalStyle } from 'styled-components';
import Wallpaper from '@assets/wallpaper.jpeg';

const GlobalStyle = createGlobalStyle`
  a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, html, i, iframe, img, ins, kbd, label, legend, li, main, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video {
    font-family: 'Noto Sans KR', sans-serif;
  }

  button {
    padding: 0;
    margin: 0;
    border: 0;
    background: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  #root {
    width: 100vw;
    height: 100vh;
    background: url(${Wallpaper}) no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blind {
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
  }
`;

export default GlobalStyle;
