import { theme } from '@styles/designSystem';
import { ThemeProvider } from 'styled-components';

export const App: React.FC = () => {
  return <ThemeProvider theme={theme}></ThemeProvider>;
};
