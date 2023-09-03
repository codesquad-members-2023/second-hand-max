import GlobalStyle from '@design/GlobalStyle';
import { theme } from '@design/designSystem';
import { AppProvider } from 'contexts/AppContext';
import AppRoutes from 'routes';
import { ThemeProvider } from 'styled-components';

const App: React.FC = () => {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider>
    </AppProvider>
  );
};

export default App;
