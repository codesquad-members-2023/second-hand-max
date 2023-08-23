import { createGlobalStyle } from 'styled-components';
import Wallpaper from '@assets/wallpaper.jpeg';

const GlobalStyle = createGlobalStyle`
  #root {
    width: 100vw;
    height: 100vh;
    background: url(${Wallpaper}) no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  * {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export default GlobalStyle;
