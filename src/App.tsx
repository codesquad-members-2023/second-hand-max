import GlobalStyle from '@design/GlobalStyle';
import { theme } from '@design/designSystem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from 'routes';
import { ThemeProvider } from 'styled-components';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRoutes />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
