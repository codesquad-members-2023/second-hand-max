import GlobalStyle from '@styles/GlobalStyle';
import { theme } from '@styles/designSystem';
import { ThemeProvider } from 'styled-components';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}></ThemeProvider>
    </>
  );
};

export default App;
