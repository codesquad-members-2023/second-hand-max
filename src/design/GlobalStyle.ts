import { createGlobalStyle } from 'styled-components';
import Wallpaper from '@assets/wallpaper.jpeg';

const GlobalStyle = createGlobalStyle`
  * {
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
