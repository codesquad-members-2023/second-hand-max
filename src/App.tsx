import GlobalStyle from '@design/GlobalStyle';
import { theme } from '@design/designSystem';
import AppRoutes from 'routes';
import { ThemeProvider } from 'styled-components';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
