import GlobalStyle from '@styles/GlobalStyle';
import { theme } from '@styles/designSystem';
import AppRoutes from 'routes';
import { ThemeProvider } from 'styled-components';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
};

export default App;
